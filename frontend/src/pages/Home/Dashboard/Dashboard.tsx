import { UserWithoutPassword } from "@/services/zustand/userStore";
import DashboardCaroussel from "./components/DashboardCaroussel";
import {
  BadgeEuro,
  BicepsFlexed,
  Dumbbell,
  Handshake,
  NotebookPen,
} from "lucide-react";
import ProgressComponent from "./components/ProgressComponent";
import { useNavigate } from "react-router-dom";
import {
  useGetProgressQuery,
  useUpdateProgressMutation,
} from "@/graphql/hooks";
import DateNavigator from "./components/DateNavigator";
import { useState } from "react";
import { format } from "date-fns";

type DashboardProps = {
  currentUser: UserWithoutPassword | null;
};

export interface Task {
  id: number;
  text: string;
  action: () => void;
  completed: boolean;
}

export default function Dashboard({ currentUser }: DashboardProps) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const isCoach = currentUser?.roles === "COACH";
  const { data } = useGetProgressQuery({ fetchPolicy: "cache-and-network" });
  const [updateProgress] = useUpdateProgressMutation();
  const progress = data?.getProgress;
  const carousselItems = [
    {
      title: "Séance d'entraînement",
      description: "Crée des entraînements sur mesure !",
      buttonContent: "Créer un entraînement",
      redirect: "/home?tab=calendar",
      image: "/dashboard/training.webp",
      icon: <NotebookPen size={18} />,
    },
    ...(isCoach
      ? [
          {
            title: "Programme d'entraînement",
            description: "Construis un programme sur mesure pour tes élèves !",
            buttonContent: "Créer un programme",
            redirect: "/home?tab=program",
            image: "/dashboard/programation.webp",
            icon: <Dumbbell size={18} />,
            complete: progress?.program,
          },
          {
            title: "Offre de coaching",
            description: "Ajoute de nouvelles offres de coaching !",
            buttonContent: "Créer une offre",
            redirect: "/home?tab=offers",
            image: "/dashboard/offer.webp",
            icon: <BadgeEuro size={18} />,
            complete: progress?.offer,
          },
        ]
      : [
          {
            title: "Coaching personnalisé",
            description: "Besoin d'un coach pour atteindre tes objectifs ?",
            buttonContent: "Trouver un coach",
            redirect: "/coach",
            image: "/dashboard/searchcoach.webp",
            icon: <Handshake size={18} />,
            complete: progress?.searchCoach,
          },
          {
            title: "Plan d'entraînement",
            description:
              "Besoin d'un plan d'entraînement pour progresser dans ta pratique ?",
            buttonContent: "Trouver un plan",
            redirect: "/plan",
            image: "/dashboard/searchplan.webp",
            icon: <BicepsFlexed size={18} />,
            complete: progress?.searchProgram,
          },
        ]),
  ];

  const tasks: Task[] = [
    {
      id: 1,
      text: "Complète ton profil",
      action: () =>
        isCoach
          ? navigate("/profile?tab=about")
          : navigate("/profile?tab=informations"),
      completed: progress?.profile ?? false,
    },
    {
      id: 2,
      text: "Crée ta première séance d'entraînement",
      action: () => navigate("/home?tab=calendar"),
      completed: progress?.training ?? false,
    },
    ...(isCoach
      ? [
          {
            id: 3,
            text: "Crée ta première offre de coaching",
            action: () => navigate("/home?tab=offers"),
            completed: progress?.offer ?? false,
          },
          {
            id: 4,
            text: "Crée ton premier programme",
            action: () => navigate("/home?tab=program"),
            completed: progress?.program ?? false,
          },
        ]
      : [
          {
            id: 3,
            text: "Visite le market place des coachs",
            action: async () => {
              await updateProgress({
                variables: {
                  data: { id: progress?.id as string, searchCoach: true },
                },
              });
              navigate("/coach");
            },
            completed: progress?.searchCoach ?? false,
          },
          {
            id: 4,
            text: "Visite le market place des plans d'entraînement",
            action: async () => {
              await updateProgress({
                variables: {
                  data: { id: progress?.id as string, searchProgram: true },
                },
              });
              navigate("/program");
            },
            completed: progress?.searchProgram ?? false,
          },
        ]),
  ];

  console.log(currentDate);

  return (
    <section className="w-full h-full flex flex-col justify-start items-center rounded-2xl pb-8 overflow-y-auto gap-2">
      <div className="w-full 2xl:w-[70%] grid grid-rows-2 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex-1 h-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="w-full h-full p-6 flex flex-col items-center justify-center">
              <ProgressComponent
                userName={currentUser?.firstname || ""}
                tasks={tasks}
              />
            </div>
          </div>
          <div className="flex bg-white justify-center items-center h-full p-4 border border-gray-100 rounded-xl shadow-sm">
            <DashboardCaroussel items={carousselItems} />
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-start items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-center items-center gap-2">
            <DateNavigator date={currentDate} setDate={setCurrentDate} />
          </div>
          <img
            src="/dashboard/noevent.webp"
            alt="no event image"
            className="object-cover w-48 h-48"
          />
          <p className="font-semibold text-gray-400">
            Aucune activité pour aujourd'hui
          </p>
        </div>
      </div>
    </section>
  );
}
