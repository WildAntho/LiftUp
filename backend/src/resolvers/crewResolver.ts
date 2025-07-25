import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Crew } from "../entities/crew";
import { User } from "../entities/user";
import { CtxUser } from "../InputType/coachType";
import { ILike, In, IsNull, Like } from "typeorm";
import { HasPermissionClass } from "../middleware/hasPermissionClass";
import { TrainingData } from "../InputType/trainingType";
import { createTrainingsForDates } from "../services/trainingService";

@HasPermissionClass(["manage:Crew"])
@Authorized("COACH")
@Resolver(Crew)
export class CrewResolver {
  @Query(() => [User])
  async getListUsersCrew(
    @Ctx() context: { user: CtxUser },
    @Arg("input", { nullable: true }) input?: string
  ) {
    let whereClause: any = {
      coach: { id: context.user.id },
      crew: IsNull(),
    };

    if (input) {
      whereClause = [
        {
          coach: { id: context.user.id },
          crew: IsNull(),
          firstname: ILike(`%${input}%`),
        },
        {
          coach: { id: context.user.id },
          crew: IsNull(),
          lastname: ILike(`%${input}%`),
        },
      ];
    }
    const users = await User.find({
      where: whereClause,
      order: {
        students: {
          firstname: "ASC",
        },
      },
    });
    return users;
  }

  @Query(() => [Crew])
  async getCoachCrews(@Ctx() context: { user: CtxUser }) {
    const crews = await Crew.find({
      where: {
        coach: { id: context.user.id },
      },
      relations: {
        students: true,
      },
    });
    return crews;
  }

  @Mutation(() => String)
  async createCrew(
    @Arg("ids", () => [String]) ids: string[],
    @Arg("name") name: string,
    @Ctx() context: { user: CtxUser }
  ) {
    const students = await User.find({
      where: {
        id: In(ids),
      },
      relations: {
        crew: true,
      },
    });
    const coach = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: {
        crew: true,
      },
    });
    if (!students) throw new Error("Aucun étudiants n'a été trouvé");
    if (!coach) throw new Error("Aucun coach n'a été trouvé");
    const crew = new Crew();
    crew.students = students;
    crew.coach = coach;
    crew.name = name;
    await crew.save();
    return JSON.stringify("L'équipe a été créé avec succès");
  }

  @Mutation(() => String)
  async deleteCrew(@Arg("id") id: string) {
    const crew = await Crew.findOne({
      where: {
        id,
      },
    });
    if (!crew) throw new Error("Aucun crew trouvé");
    crew.remove();
    return JSON.stringify("L'équipe a bien été supprimé");
  }

  @Mutation(() => String)
  async updateCrew(
    @Arg("id") id: string,
    @Arg("studentIds", () => [String]) studentIds: string[],
    @Arg("name") name: string
  ) {
    const crew = await Crew.findOne({
      where: {
        id,
      },
      relations: {
        students: true,
      },
    });
    const students = await User.find({
      where: {
        id: In(studentIds),
      },
      relations: {
        crew: true,
      },
    });
    if (!crew || !students)
      throw new Error("Aucune équipe ou élève ne correspond");
    crew.name = name;
    crew.students = students;
    await crew.save();
    return JSON.stringify("L'équipe a bien été modifiée");
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
}
