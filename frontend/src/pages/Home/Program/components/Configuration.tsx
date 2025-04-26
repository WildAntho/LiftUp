import WeekProgram from "./WeekProgram";
import CreateWorkout from "./CreateWorkout";
import { useProgramStore } from "@/services/zustand/programStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateProgram from "./UpdateProgram";
import TabChoice from "./TabChoice";

type TabKey = "workouts" | "details";

export default function Configuration() {
  const navigate = useNavigate();
  const currentProgram = useProgramStore((state) => state.program);
  const numberOfDays = (currentProgram?.duration || 0) * 7;
  const [activeTab, setActiveTab] = useState<TabKey>("workouts");
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    if (!currentProgram) {
      navigate("/home?tab=program");
    }
  }, [currentProgram, navigate]);

  if (!currentProgram) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "workouts":
        return <CreateWorkout />;
      case "details":
        return <UpdateProgram />;
    }
  };

  return (
    <section className="relative w-full h-full flex flex-col justify-between items-center pt-[60px] overflow-y-scroll">
      <section className="w-full h-full flex flex-col justify-start items-center gap-8">
        {activeTab === "workouts" && (
          <WeekProgram
            numberOfDays={numberOfDays}
            activeDay={activeDay}
            onDaySelect={setActiveDay}
          />
        )}
        <div className="w-[80%] h-full flex justify-center items-center mt-10">
          {renderContent()}
        </div>
      </section>
      <section className="absolute top-0 w-full flex justify-center items-center z-10">
        <TabChoice activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
    </section>
  );
}
