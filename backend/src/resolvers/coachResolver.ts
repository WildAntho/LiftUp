import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/user";
import { Between, ILike, IsNull } from "typeorm";
import { CtxUser, StudentCoach } from "../InputType/coachType";
import { RangeDate, TrainingData } from "../InputType/trainingType";
import { Training } from "../entities/training";
import { Feedback } from "../entities/feedback";
import { createTrainingsForDates } from "../utils/utils";
import { Crew } from "../entities/crew";

@Resolver(User)
export class CoachResolver {
  @Authorized("COACH")
  @Mutation(() => String)
  async deleteStudent(@Arg("data") { coach_id, student_id }: StudentCoach) {
    // Récupération du coach
    const coach = await User.findOne({
      where: { id: coach_id },
      relations: ["students"],
    });
    // Récupération de l'élève pour désassigner son potentiel crew et offre
    const student = await User.findOne({
      where: {
        id: student_id,
      },
      relations: {
        crew: true,
        studentOffer: true,
      },
    });

    // Si l'élève est dans un Crew (appartenant au coach) on le supprime de ce Crew
    if (student) {
      student.crew = null;
      student.studentOffer = null;
      await student.save();
    }
    // On supprime ensuite l'élève de la liste d'élève du coach
    if (coach && coach.students) {
      const newStudents = coach.students.filter(
        (s: User) => s.id != student_id
      );
      coach.students = newStudents;
      await coach.save();
      return JSON.stringify("L'élève a bien été supprimé");
    }
    return JSON.stringify("La suppression n'a pas abouti");
  }

  @Authorized("COACH")
  @Query(() => Int)
  async getTotalStudents(@Ctx() context: { user: CtxUser }) {
    const coach = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: {
        students: true,
      },
    });
    if (!coach) throw new Error("Aucune coach ne correspond");
    if (coach.students) return coach.students.length;
  }

  @Authorized("COACH")
  @Query(() => [User])
  async getStudents(
    @Arg("id") id: string,
    @Arg("input", { nullable: true }) input?: string,
    @Arg("offerId", { nullable: true }) offerId?: string,
    @Arg("crewId", { nullable: true }) crewId?: string,
    @Arg("sortRemaining", { nullable: true }) sortRemaining?: boolean
  ) {
    const query = User.createQueryBuilder("user")
      .leftJoinAndSelect("user.students", "student")
      .leftJoinAndSelect("student.crew", "crew")
      .leftJoinAndSelect("student.studentOffer", "studentOffer")
      .leftJoinAndSelect(
        "student.memberships",
        "membership",
        "(membership.isActive = true OR membership.id IS NULL)"
      )
      .where("user.id = :id", { id });

    if (input) {
      query.andWhere(
        `(student.firstname ILIKE :input OR student.lastname ILIKE :input OR student.email ILIKE :input)`,
        { input: `%${input}%` }
      );
    }

    if (offerId) {
      query.andWhere("studentOffer.id = :offerId", { offerId });
    }

    if (crewId) {
      if (crewId === "none") {
        query.andWhere("student.crew IS NULL");
      } else {
        query.andWhere("crew.id = :crewId", { crewId });
      }
    }

    if (sortRemaining) {
      query.addOrderBy(`COALESCE(membership.endDate, '9999-12-31')`, "ASC");
    } else {
      query.addOrderBy("student.firstname", "ASC");
    }

    const coach = await query.getMany();
    return coach;
  }

  @Authorized("COACH")
  @Query(() => [User])
  async selectUsers(
    @Arg("id") id: string,
    @Arg("input", { nullable: true }) input?: string
  ) {
    const whereClause = input
      ? [
          {
            roles: "STUDENT",
            firstname: ILike(`%${input}%`),
            coach: IsNull(),
          },
          {
            roles: "STUDENT",
            lastname: ILike(`%${input}%`),
            coach: IsNull(),
          },
        ]
      : {
          roles: "STUDENT",
          coach: IsNull(),
        };
    const users = await User.find({
      where: whereClause,
      relations: {
        receivedRequests: {
          sender: true,
        },
        sentRequests: {
          receiver: true,
        },
      },
      order: {
        firstname: "ASC",
      },
    });

    const newUsers: User[] = [];
    users.forEach((user) => {
      let filteredOnReceive = [];
      let filteredOnSent = [];
      if (user.receivedRequests && user.receivedRequests.length > 0) {
        filteredOnReceive = user.receivedRequests.filter((r) => {
          return r.sender.id.toString() === id && r.status === "PENDING";
        });
      }
      if (user.sentRequests && user.sentRequests.length > 0) {
        filteredOnSent = user.sentRequests.filter((r) => {
          return r.receiver.id.toString() === id && r.status === "PENDING";
        });
      }
      if (filteredOnReceive.length === 0 && filteredOnSent.length === 0) {
        newUsers.push(user);
      } else {
        if (!user.receivedRequests && !user.sentRequests) newUsers.push(user);
      }
    });
    return newUsers;
  }

  @Authorized("COACH")
  @Query(() => [Training])
  async getStudentTrainings(
    @Arg("id") id: string,
    @Arg("rangeDate") rangeDate: RangeDate,
    @Ctx() context: { user: CtxUser }
  ) {
    const student = await User.findOne({
      where: {
        id: id,
      },
      relations: {
        coach: true,
        trainings: true,
      },
    });
    const isMyCoach = student?.coach?.id === context.user.id;
    if (!isMyCoach)
      throw new Error("Vous n'êtes pas le coach de cet(te) élève");
    const trainings = await Training.find({
      where: {
        date: Between(rangeDate.startDate, rangeDate.endDate),
        user: {
          id,
        },
        createdByCoach: context.user.id,
      },
      relations: {
        user: true,
        exercices: {
          type: true,
        },
      },
    });
    return trainings;
  }

  @Authorized("COACH")
  @Query(() => [Training])
  async getCrewTraining(
    @Arg("id") id: string,
    @Arg("rangeDate") rangeDate: RangeDate,
    @Ctx() context: { user: CtxUser }
  ) {
    const crew = await Crew.findOne({
      where: {
        id,
      },
      relations: {
        coach: true,
        trainings: true,
      },
    });
    const isMyCoach = crew?.coach?.id === context.user.id;
    if (!isMyCoach)
      throw new Error("Vous n'êtes pas le coach de cet(te) élève");
    const trainings = await Training.find({
      where: {
        date: Between(rangeDate.startDate, rangeDate.endDate),
        crew: {
          id,
        },
        createdByCoach: context.user.id,
      },
      relations: {
        crew: true,
        exercices: {
          type: true,
        },
      },
    });
    return trainings;
  }

  @Authorized("COACH")
  @Mutation(() => String)
  async addTrainingStudent(
    @Arg("data") data: TrainingData,
    @Ctx() context: { user: CtxUser }
  ) {
    const student = await User.findOne({
      where: { id: data.id },
      relations: { coach: true, trainings: true },
    });
    if (!student || student.coach?.id !== context.user.id) {
      throw new Error("Vous n'êtes pas le coach de cet(te) élève");
    }

    // Ici, on ajoute une propriété spécifique indiquant que l'entraînement a été créé par un coach
    const trainings = await createTrainingsForDates(data.date, data, student, {
      createdByCoach: context.user.id,
    });

    return JSON.stringify(
      `${trainings.length} entraînements ont été créés avec succès`
    );
  }

  @Authorized("COACH")
  @Mutation(() => String)
  async addTrainingCrew(
    @Arg("data") data: TrainingData,
    @Ctx() context: { user: CtxUser }
  ) {
    const crew = await Crew.findOne({
      where: { id: data.id },
      relations: { coach: true, trainings: true },
    });
    if (!crew || crew.coach?.id !== context.user.id) {
      throw new Error("Vous n'êtes pas le coach de cet(te) élève");
    }

    // Ici, on ajoute une propriété spécifique indiquant que l'entraînement a été créé par un coach et qu'il n'est pas editable
    const trainings = await createTrainingsForDates(data.date, data, crew, {
      createdByCoach: context.user.id,
      editable: false,
      validate: true,
    });

    return JSON.stringify(
      `${trainings.length} entraînements ont été créés avec succès`
    );
  }

  @Authorized("COACH")
  @Mutation(() => String)
  async deleteTraining(
    @Arg("id") id: string,
    @Ctx() context: { user: CtxUser }
  ) {
    const student = await User.findOne({
      where: {
        id: id,
      },
      relations: {
        coach: true,
        trainings: true,
      },
    });
    const isMyCoach = student?.coach?.id === context.user.id;
    if (!isMyCoach)
      throw new Error("Vous n'êtes pas le coach de cet(te) élève");
    const training = await Training.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (training !== null) {
      training.remove();
      return JSON.stringify("L'entraînement a bien été supprimé");
    }
  }

  @Authorized("COACH")
  @Query(() => [Feedback])
  async getStudentFeedback(
    @Arg("id") id: string,
    @Arg("rangeDate") rangeDate: RangeDate,
    @Ctx() context: { user: CtxUser }
  ) {
    const student = await User.findOne({
      where: {
        id: id,
      },
      relations: {
        coach: true,
        trainings: true,
      },
    });
    const isMyCoach = student?.coach?.id === context.user.id;
    if (!isMyCoach)
      throw new Error("Vous n'êtes pas le coach de cet(te) élève");
    const feedbacks = await Feedback.find({
      where: {
        training: {
          date: Between(rangeDate.startDate, rangeDate.endDate),
          user: {
            id,
          },
          createdByCoach: context.user.id,
        },
      },
      relations: {
        training: true,
      },
    });
    return feedbacks;
  }
}
