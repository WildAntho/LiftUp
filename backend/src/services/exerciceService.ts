import { Exercice } from "../entities/exercice";
import { ExerciceModel } from "../entities/exerciceModel";
import { TrainingPlan } from "../entities/trainingPlan";
import { AddExercicePlanInput } from "../InputType/trainingPlanType";

export async function CreateMultipleExercicesFromModel(
  exercices: AddExercicePlanInput[],
  training: TrainingPlan
) {
  await Promise.all(
    exercices.map(async (e) => {
      const exercice = Exercice.create({
        title: e.title,
        rep: e.rep,
        serie: e.serie,
        intensity: e.intensity,
        weight: e.weight,
        image: e.image,
        notes: e.notes,
        position: e.position,
        trainingPlan: training,
      });
      await exercice.save();
      return exercice;
    })
  );
}
