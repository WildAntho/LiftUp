import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  AddExercicePlanInput,
  Exercice,
  ExerciceData,
  TrainingPlan,
} from "@/graphql/hooks";
import TrainingPlanCard from "./TrainingPlanCard";
import ExerciceComponent from "./ExerciceComponent";
import { DragEndEvent } from "@dnd-kit/core";

type CreateWorkoutProps = {
  trainings: TrainingPlan[];
  onCreateTraining: () => void;
  onUpdateTraining: (id: string, title: string, notes?: string) => void;
  onDeleteTraining: (id: string) => void;
  onCreateExercice: (exercices: AddExercicePlanInput[], id?: string) => void;
  onDeleteExercice: (id: string) => void;
  onUpdateExercice: (
    id: string,
    exercice: ExerciceData,
    showToast?: boolean
  ) => void;
  onUpdateDrag: (
    event: DragEndEvent,
    localExercices: Exercice[],
    setLocalExercices: (exercices: Exercice[]) => void
  ) => void;
};

export default function CreateWorkout({
  trainings,
  onCreateTraining,
  onUpdateTraining,
  onDeleteTraining,
  onCreateExercice,
  onDeleteExercice,
  onUpdateExercice,
  onUpdateDrag,
}: CreateWorkoutProps) {
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

  return (
    <section className="flex flex-col justify-between items-between gap-4 w-full h-full">
      {trainings.length === 0 ? (
        <motion.section
          className="flex flex-col justify-start items-center gap-4 w-full h-full mt-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-center text-gray-500"
          >
            Ajouter votre première séance
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center items-center gap-2"
          >
            <p className="text-md text-gray-400 text-center">
              Créer un entraînement personnalisé en ajoutant des exercices.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center items-center"
          >
            <Button
              className="group h-12 w-1/3 text-black bg-gray-100 hover:bg-gray-200 border border-black my-5 rounded-xl hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
              onClick={onCreateTraining}
            >
              <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
              <p className="transition-all duration-200 group-hover:translate-x-1">
                Créer une séance
              </p>
            </Button>
          </motion.div>
        </motion.section>
      ) : (
        <section className="flex flex-col justify-start items-center w-full gap-5">
          {trainings.map((t) => (
            <div key={t.id} className="w-full p-4">
              <TrainingPlanCard
                id={t.id}
                title={t.title}
                notes={t?.notes ?? ""}
                exerciceLength={t?.exercices?.length ?? 0}
                onUpdate={onUpdateTraining}
                onDelete={onDeleteTraining}
              />
              <ExerciceComponent
                onCreate={onCreateExercice}
                onDelete={onDeleteExercice}
                onUpdate={onUpdateExercice}
                trainingId={t.id}
                exercices={t.exercices as Exercice[]}
                onUpdateDrag={onUpdateDrag}
              />
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
