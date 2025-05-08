import { Exercice } from "../entities/exercice";
import { Program } from "../entities/program";
import { TrainingPlan } from "../entities/trainingPlan";

export async function duplicateWeek(
  repetition: number,
  trainings: TrainingPlan[]
) {
  await Promise.all(
    Array.from({ length: repetition }, (_, index) => index + 1).map(
      async (i) => {
        await copyTrainings(trainings, i * 7, true);
      }
    )
  );
}

export async function copyTrainings(
  trainings: TrainingPlan[],
  day: number,
  duplicateWeek?: boolean
) {
  await Promise.all(
    trainings.map(async (t) => {
      const program = await Program.findOneBy({ id: t.program.id });
      if (!program)
        throw new Error("Aucun programme n'existe pour ces entraînements");
      const trainingCopy = TrainingPlan.create({
        title: t.title,
        notes: t.notes,
        program: program,
        dayNumber: duplicateWeek ? t.dayNumber + day : day,
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
  training: TrainingPlan
): Promise<Exercice[]> {
  const result = await Promise.all(
    exercices.map(async (e) => {
      const { id, training: _, ...rest } = e;
      const exercice = Exercice.create({ ...rest, trainingPlan: training });
      await exercice.save();
      return exercice;
    })
  );
  return result;
}
