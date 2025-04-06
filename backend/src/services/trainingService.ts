import { ExerciceData } from "../InputType/exerciceType";
import { TrainingData } from "../InputType/trainingType";
import { Crew } from "../entities/crew";
import { Exercice } from "../entities/exercice";
import { ExerciceType } from "../entities/exerciceType";
import { Training } from "../entities/training";
import { User } from "../entities/user";

// Fonction utilitaire pour créer un exercice à partir d'une donnée d'exercice
export async function createExerciceFromData(
  index: number,
  exData: ExerciceData
): Promise<Exercice> {
  const config = {
    rep: exData.config?.rep ? exData.config.rep : 0,
    serie: exData.config?.serie ? exData.config.serie : 0,
    intensity: exData.config?.intensity ? exData.config.intensity : 0,
  };
  const type =
    exData.type &&
    (await ExerciceType.findOneBy({ value: exData?.type.value }));
  const exercice = Exercice.create({
    rep: Math.max(exData.rep + index * config.rep, 1),
    serie: Math.max(exData.serie + index * config.serie, 1),
    title: exData.title,
    weight: exData.weight,
    intensity: exData.intensity
      ? Math.min(exData.intensity + index * config.intensity, 10)
      : 0,
    notes: exData.notes,
    type: type as ExerciceType,
  });
  await exercice.save();
  return exercice;
}

// Fonction utilitaire pour créer un ensemble d'exercices
export async function createExercices(
  index: number,
  exercicesData?: ExerciceData[]
): Promise<Exercice[]> {
  if (!exercicesData || exercicesData.length === 0) return [];
  return Promise.all(
    exercicesData.map((ex) => createExerciceFromData(index, ex))
  );
}

// Fonction utilitaire pour créer des entraînements à partir d'une liste de dates
export async function createTrainingsForDates(
  dates: Date[],
  data: TrainingData,
  entity: User | Crew,
  additionalTrainingProps: Partial<Training> = {}
): Promise<Training[]> {
  return Promise.all(
    dates.map(async (date, index) => {
      const allExercices = await createExercices(index, data.exercices);
      const training = Training.create({
        title: data.title,
        notes: data.notes,
        date: new Date(date),
        editable: data.editable,
        color: data.color,
        exercices: allExercices,
        ...(entity instanceof User ? { user: entity } : { crew: entity }),
        ...additionalTrainingProps, // Permet d'ajouter des propriétés spécifiques (ex: createdByCoach)
      });
      await training.save();
      return training;
    })
  );
}

export function getNewDate(date: Date[]) {
  return date.slice(1);
}
