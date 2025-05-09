import { useUserStore } from "@/services/zustand/userStore";
import HomeSidebar from "./components/HomeSidebar";
import { useLocation } from "react-router-dom";
import Program from "./Program/Program";
import Dashboard from "./Dashboard/Dashboard";
import Statistics from "./Statistics/Statistics";
import Calendar from "./components/Calendar";
import PathBreadcrumbs from "./components/PathBreadcrumbs";
import Offers from "./Offers/Offers";
import ProtectedRoute from "@/services/ProtectedRoutes";
import ExerciceModelSection from "./ExerciceModel/ExerciceModelSection";

export default function Home() {
  const currentUser = useUserStore((state) => state.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab");

  const renderContent = () => (
    <div className="relative w-full h-full flex flex-col justify-center items-start bg-white rounded-2xl">
      <div className="absolute top-5 left-8 z-10">
        <PathBreadcrumbs />
      </div>
      <div className="relative w-full h-full">
        {!activeTab && <Dashboard currentUser={currentUser} />}
        {activeTab === "calendar" && <Calendar currentUser={currentUser} />}
        {activeTab === "program" && (
          <ProtectedRoute requiredRole="COACH">
            <Program />
          </ProtectedRoute>
        )}
        {activeTab === "offers" && (
          <ProtectedRoute requiredRole="COACH">
            <Offers />
          </ProtectedRoute>
        )}
        {activeTab === "exercices" && <ExerciceModelSection />}
        {activeTab === "statistics" && <Statistics currentUser={currentUser} />}
      </div>
    </div>
  );

  return (
    <section className="h-full p-4 gap-4 flex justify-start align-items-center">
      <HomeSidebar currentUser={currentUser} />
      {renderContent()}
    </section>
  );
}
