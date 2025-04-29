import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { TrainingPlan } from "../entities/trainingPlan";
import {
  getTrainingType,
  TrainingPlanData,
} from "../InputType/trainingPlanType";
import { Program } from "../entities/program";

@Authorized("COACH")
@Resolver(TrainingPlan)
export class TrainingPlanResolver {
  @Query(() => [TrainingPlan])
  async getTrainingPlan(@Arg("data") data: getTrainingType) {
    const trainings = await TrainingPlan.find({
      where: {
        program: { id: data.programId },
        dayNumber: data.dayNumber,
      },
      relations: { program: true },
    });
    return trainings;
  }

  @Query(() => [Number])
  async getDayNumberTraining(@Arg("id") id: string) {
    const trainings = await TrainingPlan.find({
      where: { program: { id } },
      relations: { program: true },
    });
    if (trainings.length === 0) return trainings;
    const result = trainings.map((t) => {
      return t.dayNumber;
    });
    return result;
  }

  @Mutation(() => String)
  async createTrainingPlan(@Arg("data") data: TrainingPlanData) {
    const program = await Program.findOne({ where: { id: data.programId } });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    const training = new TrainingPlan();
    training.program = program;
    training.title = data.title;
    training.notes = data.notes;
    training.dayNumber = data.dayNumber;
    await training.save();
    return "L'entraînement a bien été crée";
  }

  @Mutation(() => String)
  async updateTrainingPlan(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("notes", { nullable: true }) notes: string
  ) {
    const training = await TrainingPlan.findOneBy({ id });
    if (!training) throw new Error("Aucun entraînement n'a été trouvé");
    training.title = title;
    training.notes = notes;
    await training.save();
    return "L'entraînement a bien été modifié";
  }

  @Mutation(() => String)
  async deleteTrainingPlan(@Arg("id") id: string) {
    const training = await TrainingPlan.findOneBy({ id });
    if (!training) throw new Error("Aucun entraînement n'a été trouvé");
    training.remove();
    return "L'entraînement a bien été supprimé";
  }
}
