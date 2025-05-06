import { DeepPartial } from "typeorm";
import { Exercice } from "../entities/exercice";
import { ExerciceModel } from "../entities/exerciceModel";
import { Training } from "../entities/training";
import { TrainingPlan } from "../entities/trainingPlan";
import {
  IntensityFormat,
  RepFormat,
  ScopeExercice,
  WeightFormat,
} from "../InputType/exerciceType";
import { AddExercicePlanInput } from "../InputType/trainingPlanType";

export async function CreateMultipleExercicesFromModel(
  exercices: AddExercicePlanInput[],
  training: TrainingPlan | Training,
  scope: ScopeExercice
): Promise<Exercice[]> {
  const defaultValues = {
    intensityFormat: IntensityFormat.RPE,
    weightFormat: WeightFormat.KG,
    repFormat: RepFormat.STANDARD,
  };
  return await Promise.all(
    exercices.map(async (e) => {
      const relationField = scope === "CALENDAR" ? "training" : "trainingPlan";
      const exerciceData = {
        ...defaultValues,
        ...e,
        [relationField]: training,
      } as DeepPartial<Exercice>;
      const exercice = Exercice.create(exerciceData);
      await exercice.save();
      return exercice;
    })
  );
}
