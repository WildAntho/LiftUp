import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  PubSub,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/user";
import { Between } from "typeorm";
import { CtxUser, StudentCoach } from "../InputType/coachType";
import { RangeDate, TrainingData } from "../InputType/trainingType";
import { Training } from "../entities/training";
import { Feedback } from "../entities/feedback";
import { Crew } from "../entities/crew";
import { StudentsResponse } from "../InputType/coachProfileType";
import { createTrainingsForDates } from "../services/trainingService";
import { StatusStudent } from "../InputType/memberShipType";
import { Membership } from "../entities/memberShip";
import {
  deleteFromCrew,
  deleteStudent,
  desactivateMemberShip,
} from "../services/coachService";
import isNotificationAllowed from "../services/notificationPreferenceService";
import { NotificationType } from "../InputType/notificationType";
import { createNotification } from "../services/notificationsService";

@Authorized("COACH")
@Resolver(User)
export class CoachResolver {
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
    // Récupération du memberShip de l'élève
    const memberShip = await Membership.findOne({
      where: {
        student: { id: student_id },
        isActive: true,
        offer: { id: student?.studentOffer?.id },
      },
      relations: {
        student: true,
        offer: true,
      },
    });
    // Désactivation du membership
    if (memberShip) {
      desactivateMemberShip(memberShip);
    }
    // Si l'élève est dans un Crew (appartenant au coach) on le supprime de ce Crew
    if (student) {
      deleteFromCrew(student);
    }
    // On supprime ensuite l'élève de la liste d'élève du coach
    if (coach && student) {
      deleteStudent(student.id, coach);
    }
    return JSON.stringify("La suppression n'a pas abouti");
  }

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

  @Query(() => StudentsResponse)
  async getStudents(
    @Arg("id") id: string,
    @Arg("input", { nullable: true }) input?: string,
    @Arg("offerId", { nullable: true }) offerId?: string,
    @Arg("crewId", { nullable: true }) crewId?: string,
    @Arg("sortRemaining", { nullable: true }) sortRemaining?: boolean,
    @Arg("status", { nullable: true }) status?: StatusStudent,
    @Arg("page", { nullable: true, defaultValue: 1 }) page?: number,
    @Arg("limit", { nullable: true, defaultValue: 10 }) limit?: number
  ) {
    const query = User.createQueryBuilder("user")
      .leftJoinAndSelect("user.crew", "crew")
      .leftJoinAndSelect("user.studentOffer", "studentOffer")
      .leftJoinAndSelect(
        "user.memberships",
        "membership",
        "(membership.isActive = true OR membership.id IS NULL)"
      )
      .leftJoin("user.coach", "coach")
      .andWhere("coach.id = :id", { id });

    if (input) {
      query.andWhere(
        `(user.firstname ILIKE :input OR user.lastname ILIKE :input OR user.email ILIKE :input)`,
        { input: `%${input}%` }
      );
    }

    if (offerId) {
      query.andWhere("studentOffer.id = :offerId", { offerId });
    }

    if (crewId) {
      if (crewId === "none") {
        query.andWhere("user.crew IS NULL");
      } else {
        query.andWhere("crew.id = :crewId", { crewId });
      }
    }

    if (sortRemaining) {
      query.addOrderBy("membership.endDate", "ASC", "NULLS LAST");
    } else {
      query.addOrderBy("user.firstname", "ASC");
    }

    if (status === StatusStudent.active) {
      query.andWhere(
        "membership.isActive = true AND membership.endDate > NOW()"
      );
    }

    if (status === StatusStudent.waiting) {
      query.andWhere("membership.id IS NULL");
    }

    if (status === StatusStudent.end_7) {
      query.andWhere(`
        membership.isActive = true 
        AND membership.endDate BETWEEN NOW() AND NOW() + INTERVAL '7 days'
      `);
    }

    if (status === StatusStudent.expired) {
      query.andWhere(
        "membership.isActive = true AND membership.endDate < NOW()"
      );
    }

    const totalCount = await query.getCount();
    const offset = page && limit && (page - 1) * limit;
    query.skip(offset).take(limit);

    const students = await query.getMany();
    return { students, totalCount };
  }

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
        exercices: true,
      },
    });
    return trainings;
  }

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
      },
    });
    return trainings;
  }

  @Mutation(() => String)
  async addTrainingStudent(
    @Arg("data") data: TrainingData,
    @Ctx() context: { pubsub: PubSub; user: CtxUser }
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

    const allowedNotification = await isNotificationAllowed(
      NotificationType.NEW_TRAINING,
      student.id
    );
    if (allowedNotification && data.sendNotif) {
      const newNotification = await createNotification(
        "training",
        student.id,
        NotificationType.NEW_TRAINING,
        student.id
      );

      context.pubsub.publish("NEW_NOTIFICATION", {
        newNotification,
        topic: "NEW_NOTIFICATION",
      });
    }

    return JSON.stringify(
      `${trainings.length} entraînements ont été créés avec succès`
    );
  }

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
