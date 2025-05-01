import { Exercice, ExerciceData } from "@/graphql/hooks";
import { Input, Textarea, Tooltip } from "@heroui/react";
import { ChevronRight, Grip, Notebook, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import LogoAction from "./LogoActions";
import PulsingCircle from "./PulsingCircle";
import { Separator } from "@/components/ui/separator";
import { useDebouncedCallback } from "@/services/useDebouncedCallback";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ExercicePlanCardProps = {
  exercice: Exercice;
  onDelete: (id: string) => void;
  onUpdate: (id: string, exercice: ExerciceData) => void;
};

export default function ExercicePlanCard({
  exercice,
  onDelete,
  onUpdate,
}: ExercicePlanCardProps) {
  const [showAll, setShowAll] = useState(false);
  const [currentExercice, setCurrentExercice] = useState(exercice);
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleDeleteExercice = () => {
    onDelete(exercice.id);
  };

  const debouncedUpdate = useDebouncedCallback(
    async () => {
      onUpdate(exercice.id, currentExercice);
    },
    2000,
    { leading: true }
  );

  useEffect(() => {
    setCurrentExercice(exercice);
  }, [exercice]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercice.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <section className="w-full h-full flex flex-col items-center justify-center p-4 gap-5 rounded-2xl bg-white border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1">
        <section
          className="w-full flex items-center justify-between cursor-pointer"
          onClick={toggleShowAll}
        >
          <div className="flex items-center justify-center gap-6">
            <Tooltip
              content="Déplacer"
              showArrow={true}
              color="foreground"
              className="text-xs"
            >
              <div
                {...attributes}
                {...listeners}
                className="hover:bg-gray-200 p-3 rounded-full cursor-move"
              >
                <Grip size={18} className="text-gray-500" />
              </div>
            </Tooltip>
            <img
              src={`/exercices${exercice.image}`}
              alt="Image Exercice"
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="text-sm font-semibold">{exercice.title}</p>
              <p className="text-xs text-gray-500">
                {exercice.serie} {`série${exercice.serie > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <section className="flex justify-center items-center gap-4">
            <div
              className="flex justify-center items-center gap-2 px-3 py-2 bg-gray-50 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="group relative transition-all duration-200 ease-in-out hover:-translate-y-0.5">
                <LogoAction
                  logo={<Notebook size={20} />}
                  title="Note d'entraînement"
                  onClick={toggleShowAll}
                />
                {exercice.notes && exercice.notes.length > 0 && (
                  <PulsingCircle />
                )}
              </div>
              <div className="group relative transition-all duration-200 ease-in-out hover:-translate-y-0.5">
                <LogoAction
                  logo={<Save size={20} />}
                  title="Enregistrer"
                  onClick={debouncedUpdate}
                />
              </div>
              <div className="group relative transition-all duration-200 ease-in-out hover:-translate-y-0.5">
                <LogoAction
                  logo={<Trash2 size={20} />}
                  title="Supprimer"
                  onClick={handleDeleteExercice}
                />
              </div>
            </div>
            <ChevronRight
              size={20}
              className={`text-gray-500 transition-all duration-200 ease-in-out ${
                showAll ? "rotate-90" : ""
              }`}
            />
          </section>
        </section>
        <section
          className={`w-full h-full flex flex-col justify-start items-center gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
            showAll ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full h-full flex justify-center items-center gap-1">
            <Input
              label="Série"
              radius="sm"
              type="number"
              value={(currentExercice.serie ?? 1).toString()}
              onChange={(e) =>
                setCurrentExercice((prev) => ({
                  ...prev,
                  serie: Number(e.target.value),
                }))
              }
            />
            <Separator orientation="vertical" className="h-12" />
            <Input
              label="Répétitions"
              radius="sm"
              type="number"
              value={(currentExercice.rep ?? 1).toString()}
              onChange={(e) =>
                setCurrentExercice((prev) => ({
                  ...prev,
                  rep: Number(e.target.value),
                }))
              }
            />
            <Separator orientation="vertical" className="h-12" />
            <Input
              label="Poids"
              radius="sm"
              type="number"
              value={(currentExercice.weight ?? 1).toString()}
              onChange={(e) =>
                setCurrentExercice((prev) => ({
                  ...prev,
                  weight: Number(e.target.value),
                }))
              }
            />
            <Separator orientation="vertical" className="h-12" />
            <Input
              label="Intensité"
              radius="sm"
              type="number"
              value={(currentExercice.intensity ?? 1).toString()}
              onChange={(e) =>
                setCurrentExercice((prev) => ({
                  ...prev,
                  intensity: Number(e.target.value),
                }))
              }
            />
          </div>
          <Separator />
          <Textarea
            label="Ajouter des notes"
            value={currentExercice.notes ?? ""}
            onChange={(e) =>
              setCurrentExercice((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
          />
        </section>
      </section>
    </div>
  );
}
