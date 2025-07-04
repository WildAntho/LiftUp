import { DeepPartial } from "typeorm";
import { Exercice } from "../entities/exercice";
import { ExerciceModel } from "../entities/exerciceModel";
import { Training } from "../entities/training";
import { TrainingPlan } from "../entities/trainingPlan";
import {
  ExerciceData,
  IntensityFormat,
  RepFormat,
  ScopeExercice,
  WeightFormat,
} from "../InputType/exerciceType";

export async function CreateMultipleExercicesFromModel(
  exercices: ExerciceData[],
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
      const exerciceModel = await ExerciceModel.findOneBy({id: e.exerciceModelId})
      const exerciceData = {
        ...defaultValues,
        ...e,
        exerciceModel,
        [relationField]: training,
      } as DeepPartial<Exercice>;
      const exercice = Exercice.create(exerciceData);
      await exercice.save();
      return exercice;
    })
  );
}
