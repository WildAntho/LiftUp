import {
  Exercice,
  ExerciceModel,
  useAddExerciceMutation,
} from "@/graphql/hooks";
import { picture } from "../services/utils";
import { Plus } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Dispatch, SetStateAction } from "react";

type ExerciceModelCardProps = {
  exercice: ExerciceModel;
  exercices: Exercice[];
  setExercices: Dispatch<SetStateAction<Exercice[]>>;
  isNew?: boolean;
  trainingId?: string;
};

export default function ExerciceModelCard({
  setExercices,
  exercices,
  exercice,
  isNew,
  trainingId,
}: ExerciceModelCardProps) {
  const [addExercice] = useAddExerciceMutation();
  const data = {
    title: exercice.title,
    rep: exercice.rep,
    serie: exercice.serie,
    weight: exercice.weight,
    intensity: exercice.intensity,
    notes: exercice.notes,
    type: {
      id: exercice.type?.id ? exercice.type.id : "",
      value: exercice.type?.value ? exercice.type.value : "",
      label: exercice.type?.label ? exercice.type.label : "",
    },
  };
  const handleClick = async () => {
    const newExercice = {
      ...data,
      id: `temp-${Date.now()}`,
    };
    const newTab = [...exercices, newExercice];
    if (isNew) {
      setExercices(newTab);
    } else {
      const { data: dataExercice } = await addExercice({
        variables: {
          data,
          id: trainingId as string,
        },
      });
      const exerciceToAdd = {
        ...data,
        id: dataExercice?.addExercice.id.toString() || `temp-${Date.now()}`,
      };
      setExercices([...exercices, exerciceToAdd]);
    }
  };
  return (
    <section className="flex justify-between items-center w-full p-2 bg-gray-50 drop-shadow-md rounded-lg z-1000 touch-none">
      <div className="flex justify-start items-center gap-4">
        {picture.find((p) => p.type === exercice.type?.value)?.image}
        <p className="text-xs hover:underline hover:underline-offset-4 cursor-pointer">
          {exercice.title}
        </p>
      </div>
      <Tooltip
        content="Ajouter l'exercice"
        className="text-xs"
        showArrow={true}
        color="foreground"
      >
        <Plus
          className="opacity-50 hover:opacity-100 cursor-pointer"
          onClick={handleClick}
        />
      </Tooltip>
    </section>
  );
}
