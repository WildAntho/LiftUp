import { useUserStore } from "@/services/zustand/userStore";
import HomeSidebar from "./components/HomeSidebar";
import { useLocation } from "react-router-dom";
import Program from "./Program/Program";
import Dashboard from "./Dashboard/Dashboard";
import Calendar from "./components/Calendar";
import PathBreadcrumbs from "./components/PathBreadcrumbs";
import Offers from "./Offers/Offers";
import ProtectedRoute from "@/services/ProtectedRoutes";
import ExerciceModelSection from "./ExerciceModel/ExerciceModelSection";
import Coaching from "./Coaching/Coaching";
import { UserRole } from "@/graphql/hooks";
import { PERMISSIONS } from "@/services/constants";

export default function Home() {
  const currentUser = useUserStore((state) => state.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab");

  const renderContent = () => (
    <div className="relative w-full h-full flex flex-col justify-center items-start rounded-2xl">
      {activeTab && (
        <div className="absolute top-5 left-8 z-10">
          <PathBreadcrumbs />
        </div>
      )}
      <div className="relative w-full h-full">
        {!activeTab && <Dashboard currentUser={currentUser} />}
        {activeTab === "calendar" && <Calendar currentUser={currentUser} />}
        {activeTab === "program" && (
          <ProtectedRoute
            requiredRole={UserRole.Coach}
            permission={PERMISSIONS.MANAGE_PROGRAM}
          >
            <Program />
          </ProtectedRoute>
        )}
        {activeTab === "offers" && (
          <ProtectedRoute requiredRole={UserRole.Coach}>
            <Offers />
          </ProtectedRoute>
        )}
        {activeTab === "coaching" && (
          <ProtectedRoute requiredRole={UserRole.Student}>
            <Coaching />
          </ProtectedRoute>
        )}
        {activeTab === "exercices" && <ExerciceModelSection />}
      </div>
    </div>
  );

  return (
    <section className="h-full p-4 gap-4 flex justify-start align-items-center">
      <HomeSidebar />
      {renderContent()}
    </section>
  );
}
