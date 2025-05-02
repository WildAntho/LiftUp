import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { TrainingPlan } from "../entities/trainingPlan";
import {
  AddExercicePlanInput,
  getTrainingType,
  TrainingPlanData,
} from "../InputType/trainingPlanType";
import { Program } from "../entities/program";
import { ExerciceModel } from "../entities/exerciceModel";
import { createExerciceFromData } from "../services/trainingService";
import { CreateMultipleExercicesFromModel } from "../services/exerciceService";
import { Exercice } from "../entities/exercice";
import { ExerciceModelData } from "../InputType/exerciceModelType";
import { ScopeExercice } from "../InputType/exerciceType";

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
      order: {
        exercices: {
          position: "ASC",
        },
      },
      relations: { program: true, exercices: true },
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

  @Mutation(() => String)
  async addExerciceToProgram(
    @Arg("id") trainingId: string,
    @Arg("exercices", () => [AddExercicePlanInput])
    exercices: AddExercicePlanInput[]
  ) {
    const training = await TrainingPlan.findOne({
      where: { id: trainingId },
      relations: { exercices: true },
    });
    if (!training) throw new Error("Aucun entraînement n'a été trouvé");
    await CreateMultipleExercicesFromModel(exercices, training, ScopeExercice.PROGRAM);
    return exercices.length > 1
      ? "Les exercices ont bien été ajouté"
      : "L'exercice a bien été ajouté";
  }
}
