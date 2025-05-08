import { addDays } from "date-fns";
import { Training } from "../entities/training";
import { TrainingPlan } from "../entities/trainingPlan";
import { User } from "../entities/user";
import { Exercice } from "../entities/exercice";

export async function generateTraining(
  trainings: TrainingPlan[],
  user: User,
  coachId: string,
  startDate: Date
) {
  const results = await Promise.all(
    trainings.map(async (t) => {
      const trainingCopy = Training.create({
        title: t.title,
        notes: t.notes,
        date: addDays(startDate, t.dayNumber - 1),
        createdByCoach: coachId,
        user,
      });
      await trainingCopy.save();
      let allExercices: Exercice[] = [];
      if (t.exercices && t.exercices.length > 0) {
        allExercices = await createAllExercices(t.exercices, trainingCopy);
      }
      trainingCopy.exercices = allExercices;
      return trainingCopy;
    })
  );
}

async function createAllExercices(
  exercices: Exercice[],
  training: Training
): Promise<Exercice[]> {
  const result = await Promise.all(
    exercices.map(async (e) => {
      const { id, training: _, ...rest } = e;
      const exercice = Exercice.create({ ...rest, training });
      await exercice.save();
      return exercice;
    })
  );
  return result;
}
