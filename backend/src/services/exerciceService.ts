import { Exercice } from "../entities/exercice";
import { ExerciceModel } from "../entities/exerciceModel";
import { Training } from "../entities/training";
import { TrainingPlan } from "../entities/trainingPlan";
import { ScopeExercice } from "../InputType/exerciceType";
import { AddExercicePlanInput } from "../InputType/trainingPlanType";

export async function CreateMultipleExercicesFromModel(
  exercices: AddExercicePlanInput[],
  training: TrainingPlan | Training,
  scope: ScopeExercice
) {
  await Promise.all(
    exercices.map(async (e) => {
      const commonData = {
        title: e.title,
        rep: e.rep,
        serie: e.serie,
        intensity: e.intensity,
        weight: e.weight,
        image: e.image,
        notes: e.notes,
        position: e.position,
      };

      const exercice = Exercice.create({
        ...commonData,
        ...(scope === "CALENDAR" ? { training } : { trainingPlan: training }),
      });

      await exercice.save();
      return exercice;
    })
  );
}
