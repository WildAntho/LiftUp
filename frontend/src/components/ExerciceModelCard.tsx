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
    rep: exercice.rep ?? 1,
    serie: exercice.serie ?? 1,
    weight: exercice.weight ?? 0,
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
    <section className="flex justify-between items-center w-full p-2 border border-gray-200 bg-white shadow-md rounded-lg z-1000 touch-none">
      <div className="flex justify-start items-center gap-4">
        {picture.find((p) => p.type === exercice.type?.value)?.image}
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm font-semibold text-gray-800">
            {exercice.title}
          </p>
          <p className="text-xs text-gray-500">
            {exercice.serie}{" "}
            {`série${exercice.serie && exercice.serie > 1 ? "s" : ""}`}
          </p>
        </div>
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
