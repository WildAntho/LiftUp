import { useUserStore } from "@/services/zustand/userStore";
import Calendar from "./components/Calendar";
import HomeSidebar from "./components/HomeSidebar";
import { useLocation } from "react-router-dom";
import Program from "./Program/Program";
import Dashboard from "./Dashboard/Dashboard";
import ExerciceModel from "./ExerciceModel/ExerciceModel";
import Statistics from "./Statistics/Statistics";
import TrainingModel from "./TrainingModel/TrainingModel";

export default function Home() {
  const currentUser = useUserStore((state) => state.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab");
  return (
    <section className="h-full p-4 gap-4 flex justify-start align-items-center">
      <HomeSidebar currentUser={currentUser} />
      {!activeTab && <Dashboard currentUser={currentUser} />}
      {activeTab === "calendar" && <Calendar currentUser={currentUser} />}
      {activeTab === "program" && <Program currentUser={currentUser} />}
      {activeTab === "training" && <TrainingModel currentUser={currentUser} />}
      {activeTab === "exercices" && <ExerciceModel currentUser={currentUser} />}
      {activeTab === "statistics" && <Statistics currentUser={currentUser} />}
    </section>
  );
}
