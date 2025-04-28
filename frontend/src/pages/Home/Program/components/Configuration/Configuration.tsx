import WeekProgram from "./components/WeekProgram";
import { useProgramStore } from "@/services/zustand/programStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateProgram from "./components/UpdateProgram";
import TabChoice from "./components/TabChoice";
import {
  TrainingPlan,
  UpdateProgramInput,
  useCreateTrainingPlanMutation,
  useGetDayNumberTrainingQuery,
  useGetTrainingPlanQuery,
} from "@/graphql/hooks";
import CreateWorkout from "./components/CreateWorkout";
import { toast } from "sonner";

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
      toast.success(data?.createTrainingPlan, {
        style: {
          backgroundColor: "#dcfce7",
          color: "#15803d",
        },
      });
      refetchDayNumber();
      refetchTraining();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'archivage du programme");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "workouts":
        return (
          <CreateWorkout
            trainings={trainings as TrainingPlan[]}
            onCreate={handleCreateTraining}
          />
        );
      case "details":
        return (
          <UpdateProgram onUpdate={onUpdate} backConfig={handleBackConfig} />
        );
    }
  };

  return (
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
  );
}
