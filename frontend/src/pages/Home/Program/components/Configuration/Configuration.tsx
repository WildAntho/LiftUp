import WeekProgram from "./components/WeekProgram";
import { useProgramStore } from "@/services/zustand/programStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateProgram from "./components/UpdateProgram";
import TabChoice from "./components/TabChoice";
import {
  AddExercicePlanInput,
  Exercice,
  ExerciceData,
  TrainingPlan,
  UpdateProgramInput,
  useAddExerciceProgramMutation,
  useCreateTrainingPlanMutation,
  useDeleteExerciceMutation,
  useDeleteTrainingPlanMutation,
  useGetDayNumberTrainingQuery,
  useGetTrainingPlanQuery,
  useUpdateExerciceMutation,
  useUpdateTrainingPlanMutation,
} from "@/graphql/hooks";
import CreateWorkout from "./components/CreateWorkout";
import { toast } from "sonner";
import FloatingDock from "./components/FloatingDock";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

type ConfigurationProps = {
  onUpdate: (id: string, program: UpdateProgramInput) => void;
};

type TabKey = "workouts" | "details";

export default function Configuration({ onUpdate }: ConfigurationProps) {
  const navigate = useNavigate();
  const currentProgram = useProgramStore((state) => state.program);
  const numberOfDays = (currentProgram?.duration || 0) * 7;
  const [activeTab, setActiveTab] = useState<TabKey>("workouts");
  const [activeDay, setActiveDay] = useState<number>(1);

  const { data: dataDayNumber, refetch: refetchDayNumber } =
    useGetDayNumberTrainingQuery({
      variables: {
        programId: currentProgram?.id.toString() as string,
      },
    });

  const { data: dataTraining, refetch: refetchTraining } =
    useGetTrainingPlanQuery({
      variables: {
        data: {
          programId: currentProgram?.id.toString() as string,
          dayNumber: activeDay,
        },
      },
    });

  const [createTraining] = useCreateTrainingPlanMutation();
  const [updateTraining] = useUpdateTrainingPlanMutation();
  const [deleteTraining] = useDeleteTrainingPlanMutation();
  const [createExercice] = useAddExerciceProgramMutation();
  const [deleteExercice] = useDeleteExerciceMutation();
  const [updateExercice] = useUpdateExerciceMutation();

  const allDayNumberTraining = dataDayNumber?.getDayNumberTraining ?? [];
  const trainings = dataTraining?.getTrainingPlan ?? [];

  useEffect(() => {
    if (!currentProgram) {
      navigate("/home?tab=program");
    }
  }, [currentProgram, navigate]);

  if (!currentProgram) return null;

  const handleBackConfig = () => {
    setActiveTab("workouts");
  };

  const successAction = (content: string) => {
    toast.success(content, {
      style: {
        backgroundColor: "#dcfce7",
        color: "#15803d",
      },
    });
    refetchDayNumber();
    refetchTraining();
  };

  const handleCreateTraining = async () => {
    try {
      const { data } = await createTraining({
        variables: {
          data: {
            programId: currentProgram.id.toString() as string,
            title: "Nouvel entraînement",
            dayNumber: activeDay,
          },
        },
      });
      successAction(data?.createTrainingPlan ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'archivage du programme");
    }
  };

  const handleUpdateTraining = async (
    id: string,
    title: string,
    notes?: string
  ) => {
    try {
      const { data } = await updateTraining({
        variables: {
          id,
          title,
          notes,
        },
      });
      successAction(data?.updateTrainingPlan ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'archivage du programme");
    }
  };

  const handleDeleteTraining = async (id: string) => {
    try {
      const { data } = await deleteTraining({ variables: { id } });
      successAction(data?.deleteTrainingPlan ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'archivage du programme");
    }
  };

  const handleCreateExercice = async (
    id: string,
    exercices: AddExercicePlanInput[]
  ) => {
    try {
      const { data } = await createExercice({
        variables: {
          trainingId: id,
          exercices,
        },
      });
      successAction(data?.addExerciceToProgram ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'ajout dex exercices");
    }
  };

  const handleDeleteExercice = async (id: string) => {
    try {
      const { data } = await deleteExercice({ variables: { id } });
      successAction(data?.deleteExercice ?? "");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'ajout dex exercices");
    }
  };

  const handleUpdateExercice = async (
    id: string,
    exercice: ExerciceData,
    showToast: boolean = true
  ) => {
    try {
      await updateExercice({
        variables: {
          id,
          data: {
            title: exercice.title,
            rep: exercice.rep,
            serie: exercice.serie,
            intensity: exercice.intensity,
            weight: exercice.weight,
            notes: exercice.notes,
            position: exercice.position,
          },
        },
      });
      if (showToast) successAction("L'exercice à bien été mis à jour");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'ajout dex exercices");
    }
  };

  const handleDragEnd = async (
    event: DragEndEvent,
    localExercices: Exercice[],
    setLocalExercices: (exercices: Exercice[]) => void
  ) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = localExercices.findIndex((item) => item.id === active.id);
    const newIndex = localExercices.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(localExercices, oldIndex, newIndex);
    setLocalExercices(newOrder);
    await Promise.all(
      newOrder.map((ex, index) => {
        if (ex.position !== index) {
          return handleUpdateExercice(ex.id, { ...ex, position: index }, false);
        }
      })
    );
    refetchTraining();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "workouts":
        return (
          <CreateWorkout
            trainings={trainings as TrainingPlan[]}
            onCreateTraining={handleCreateTraining}
            onUpdateTraining={handleUpdateTraining}
            onDeleteTraining={handleDeleteTraining}
            onCreateExercice={handleCreateExercice}
            onDeleteExercice={handleDeleteExercice}
            onUpdateExercice={handleUpdateExercice}
            onUpdateDrag={handleDragEnd}
          />
        );
      case "details":
        return (
          <UpdateProgram onUpdate={onUpdate} backConfig={handleBackConfig} />
        );
    }
  };

  return (
    <>
      {activeTab === "workouts" && (
        <FloatingDock onCreate={handleCreateTraining} />
      )}
      <section className="relative w-full h-full flex flex-col justify-between items-center pt-[60px] overflow-y-scroll">
        <section className="w-full 2xl:w-[75%] h-full flex flex-col justify-start items-center gap-8">
          {activeTab === "workouts" && (
            <WeekProgram
              numberOfDays={numberOfDays}
              activeDay={activeDay}
              onDaySelect={setActiveDay}
              allDayNumber={allDayNumberTraining}
            />
          )}
          <div className="w-[80%] h-full flex justify-center items-center">
            {renderContent()}
          </div>
        </section>
        <section className="absolute top-0 w-full flex justify-center items-center z-10">
          <TabChoice activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>
      </section>
    </>
  );
}
