import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import DrawerExercice from "./DrawerExercice";
import { AddExercicePlanInput, Exercice, ExerciceData } from "@/graphql/hooks";
import ExercicePlanCard from "./ExercicePlanCard";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useEffect, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";

type ExerciceComponentProps = {
  onCreate: (id: string, exercices: AddExercicePlanInput[]) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, exercice: ExerciceData, showToast?: boolean) => void;
  onUpdateDrag: (
    event: DragEndEvent,
    localExercices: Exercice[],
    setLocalExercices: (exercices: Exercice[]) => void
  ) => void;
  trainingId: string;
  exercices: Exercice[];
};

export default function ExerciceComponent({
  onCreate,
  onDelete,
  onUpdate,
  onUpdateDrag,
  trainingId,
  exercices,
}: ExerciceComponentProps) {
  const [localExercices, setLocalExercices] = useState<Exercice[]>(exercices);

  // Synchronise localExercices quand les props changent
  useEffect(() => {
    setLocalExercices(exercices);
  }, [exercices]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const handleCreate = (exercices: AddExercicePlanInput[]) => {
    const lastPosition = (localExercices.at(-1)?.position ?? -1) + 1;
    const allExercicesWithPosition = exercices.map((e, i) => {
      return {
        ...e,
        position: lastPosition + i,
      };
    });
    onCreate(trainingId, allExercicesWithPosition);
  };

  const handleDelete = (deletedId: string) => {
    const updatedExercices = localExercices
      .filter((e) => e.id !== deletedId)
      .map((e, index) => ({
        ...e,
        position: index,
      }));
    onDelete(deletedId);
    setLocalExercices(updatedExercices);
    updatedExercices.forEach((e) => {
      onUpdate(e.id, e, false);
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    onUpdateDrag(event, localExercices, setLocalExercices);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const hasExercice = exercices.length > 0;
  return (
    <motion.section
      className="flex flex-col justify-start items-center gap-4 w-full h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Separator orientation="vertical" className="h-12" />
      {!hasExercice && (
        <>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-center text-gray-500"
          >
            Ajouter un exercice à cette séance
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center items-center gap-2"
          >
            <p className="text-md text-gray-400 text-center">
              Créer un exercice personnalisé pour un entraînement sur mesure.
            </p>
          </motion.div>
        </>
      )}
      <section className="w-[90%] flex flex-col items-center gap-2">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={localExercices.map((e) => e.id)}>
            {localExercices.map((e) => (
              <section className="w-full" key={e.id}>
                <ExercicePlanCard
                  exercice={e}
                  onDelete={handleDelete}
                  onUpdate={onUpdate}
                />
              </section>
            ))}
          </SortableContext>
        </DndContext>
        <Separator orientation="vertical" className="h-6" />
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center items-center"
        >
          <DrawerExercice onCreate={handleCreate} />
        </motion.div>
      </section>
    </motion.section>
  );
}
