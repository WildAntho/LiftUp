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
import { generateTraining } from "../services/programService";
import isNotificationAllowed from "../services/notificationPreferenceService";
import { NotificationType } from "../InputType/notificationType";
import { createNotification } from "../services/notificationsService";

@Authorized("COACH")
@Resolver(Program)
export class ProgramResolver {
  @Query(() => [Program])
  async getPrograms(
    @Ctx() context: { user: CtxUser },
    @Arg("status", { nullable: true }) status?: ProgramStatus
  ) {
    const programs = await Program.find({
      where: {
        coach: {
          id: context.user.id,
        },
        status,
      },
    });
    return programs;
  }

  @Mutation(() => Program)
  async createProgram(
    @Arg("data") data: ProgramInput,
    @Ctx() context: { user: CtxUser }
  ) {
    const coach = await User.findOne({
      where: {
        id: context.user.id,
      },
    });
    if (!coach) throw new Error("Aucun utilisateur n'a été trouvé");
    if (!coach) throw new Error("Aucune coach ne correspond");
    const program = new Program();
    program.title = data.title;
    program.description = data.description;
    program.duration = data.duration;
    if (data.price) program.price = data.price;
    if (data.level) program.level = data.level;
    program.public = data.public;
    program.coach = coach;
    await program.save();
    return program;
  }

  @Mutation(() => String)
  async updateProgram(
    @Arg("data") data: UpdateProgramInput,
    @Arg("id") id: string
  ) {
    const program = await Program.findOne({
      where: {
        id,
      },
    });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.title = data.title;
    program.description = data.description;
    program.duration = data.duration;
    program.status = data.status;
    if (data.price) program.price = data.price;
    if (data.level) program.level = data.level;
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
    program.remove();
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
