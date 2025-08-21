import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  PubSub,
  Query,
  Resolver,
} from "type-graphql";
import { Program } from "../entities/program";
import {
  ProgramInput,
  ProgramStatus,
  UpdateProgramInput,
} from "../InputType/programType";
import { CtxUser } from "../InputType/coachType";
import { User } from "../entities/user";
import { TrainingPlan } from "../entities/trainingPlan";
import {
  checkAutorization,
  generateTraining,
} from "../services/programService";
import isNotificationAllowed from "../services/notificationPreferenceService";
import { NotificationType } from "../InputType/notificationType";
import { createNotification } from "../services/notificationsService";
import { updateProgress } from "../services/progressService";
import { OfferCategory } from "../entities/offerCategory";
import { HasPermissionClass } from "../middleware/hasPermissionClass";

@HasPermissionClass(["manage:Program"])
@Authorized("COACH")
@Resolver(Program)
export class ProgramResolver {
  @Query(() => [Program])
  async getPrograms(
    @Ctx() context: { user: CtxUser },
    @Arg("status", { nullable: true }) status?: ProgramStatus
  ) {
    const programs = await Program.find({
      where: { coach: { id: context.user.id }, status },
      relations: { category: true },
    });
    return programs;
  }

  @Mutation(() => Program)
  async createProgram(
    @Arg("data") data: ProgramInput,
    @Ctx() context: { user: CtxUser }
  ) {
    const coach = await User.findOne({
      where: { id: context.user.id },
      relations: { coachProfile: true },
    });
    const category = await OfferCategory.findOneBy({ id: data.categoryId });
    if (!category && data.public) throw new Error("Aucune catégorie n'a été trouvé");
    if (!coach) throw new Error("Aucun utilisateur n'a été trouvé");
    checkAutorization(data, coach, category);
    const program = new Program();
    program.title = data.title;
    program.description = data.description;
    program.duration = data.duration;
    program.price = data.price;
    program.level = data.level;
    program.public = data.public;
    if (category) program.category = category;
    program.coach = coach;
    await program.save();
    await updateProgress(context.user.id, "program");
    return program;
  }

  @Mutation(() => String)
  async updateProgram(
    @Ctx() context: { user: CtxUser },
    @Arg("data") data: UpdateProgramInput,
    @Arg("id") id: string
  ) {
    const program = await Program.findOne({
      where: {
        id,
      },
      relations: {
        coach: true,
      },
    });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    const coach = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: {
        coachProfile: true,
      },
    });
    if (!coach) throw new Error("Aucun utilisateur n'a été trouvé");
    if (coach.id !== program?.coach.id)
      throw new Error("Vous n'êtes pas autorisé à effectuer cette action");
    const category = await OfferCategory.findOneBy({ id: data.categoryId });
    checkAutorization(data, coach, category);
    program.title = data.title;
    program.description = data.description;
    program.duration = data.duration;
    program.status = data.status;
    program.price = data.price;
    program.level = data.level;
    if (category) program.category = category;
    program.public = data.public;
    await program.save();
    return "Les détails du programme ont été mis à jour";
  }

  @Mutation(() => String)
  async archiveProgram(@Arg("id") id: string) {
    const program = await Program.findOne({ where: { id } });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.status = ProgramStatus.ARCHIVED;
    await program.save();
    return "Le programme a été archivé avec succès";
  }

  @Mutation(() => String)
  async publishProgram(@Arg("id") id: string) {
    const program = await Program.findOne({ where: { id } });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.status = ProgramStatus.PUBLISHED;
    await program.save();
    return "Le programme a été validé avec succès";
  }

  @Mutation(() => String)
  async deleteProgram(@Arg("id") id: string) {
    const program = await Program.findOneBy({ id });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.status = ProgramStatus.DELETED;
    await program.save();
    return "Le programme a bien été supprimé";
  }

  @Mutation(() => String)
  async generateProgram(
    @Arg("programId") programId: string,
    @Arg("userIds", () => [String]) userIds: string[],
    @Arg("coachId") coachId: string,
    @Arg("startDate") startDate: Date,
    @Ctx() context: { pubsub: PubSub }
  ) {
    const trainings = await TrainingPlan.find({
      where: {
        program: { id: programId },
      },
      relations: {
        program: true,
        exercices: true,
      },
    });
    const coach = await User.findOneBy({ id: coachId });
    if (trainings.length === 0)
      throw new Error("Aucun entraînement n'est disponible pour ce programme");
    if (!coach) throw new Error("Aucun coach n'a été trouvé");
    await Promise.all(
      userIds.map(async (u) => {
        const user = await User.findOneBy({ id: u });
        if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
        await generateTraining(trainings, user, coachId, startDate);
        const allowedNotification = await isNotificationAllowed(
          NotificationType.NEW_TRAINING,
          u
        );
        if (allowedNotification) {
          const newNotification = await createNotification(
            "training",
            u,
            NotificationType.NEW_TRAINING,
            u
          );

          context.pubsub.publish("NEW_NOTIFICATION", {
            newNotification,
            topic: "NEW_NOTIFICATION",
          });
        }
      })
    );
    return "Programme généré avec succès";
  }
}
