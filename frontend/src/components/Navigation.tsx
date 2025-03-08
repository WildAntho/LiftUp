import {
  CalendarIcon,
  ChevronDown,
  Handshake,
  LogOut,
  Settings,
  UserPen,
} from "lucide-react";
import { Button } from "./ui/button";
import { ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUserStore } from "@/services/zustand/userStore";
import { useLogoutMutation } from "@/graphql/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudentStore } from "@/services/zustand/studentStore";
import MyAvatar from "./MyAvatar";
import Notifications from "./Notifications";
import ChatIcon from "./ChatIcon";
import { useCrewStore } from "@/services/zustand/crewStore";

type Link = {
  id: number;
  value: string;
  label: string;
  icon?: ReactElement;
};

export default function Navigation() {
  const location = useLocation();
  const path = location.pathname;
  const currentUser = useUserStore((state) => state.user);
  const ROLE_COACH = "COACH";
  const ROLE_STUDENT = "STUDENT";
  const isCoach = currentUser?.roles === ROLE_COACH;
  const isStudent = currentUser?.roles === ROLE_STUDENT;
  const links: Link[] = [
    {
      id: 1,
      value: "/",
      label: "Calendrier",
      icon: <CalendarIcon size={16} />,
    },
    ...(isCoach
      ? [
          {
            id: 2,
            value: "/students",
            label: "Mes élèves",
          },
          {
            id: 3,
            value: "/crew",
            label: "Mes équipes",
          },
        ]
      : []),
    {
      id: 4,
      value: "/trainings",
      label: "Mes entrainements",
    },
    {
      id: 5,
      value: "/exercices",
      label: "Mes exercices",
    },
    ...(isStudent
      ? [
          {
            id: 6,
            value: "/coach",
            label: "Besoin d'un coach ?",
            icon: <Handshake />,
          },
        ]
      : []),
  ];
  const navigate = useNavigate();
  const clearStore = useUserStore((state) => state.clear);
  const clearStudent = useStudentStore((state) => state.clear);
  const clearCrew = useCrewStore((state) => state.clear);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    clearStore();
    clearStudent();
    clearCrew();
    navigate("/login");
  };

  return (
    <section className="w-full h-full bg-white shadow-sm flex justify-between items-center pr-10 pl-10">
      <section className="flex justify-center items-center gap-20">
        <div className="w-[80px] cursor-pointer" onClick={() => navigate("/")}>
          <p className="font-logo text-primary text-5xl">LiftUp</p>
        </div>
        <section className="flex justify-center items-center gap-3">
          {links.map((l: Link) => (
            <Button
              key={l.id}
              variant={l.value === path ? "default" : "ghost"}
              onClick={() => {
                navigate(`${l.value}`);
              }}
              className={`${
                l.value === path && "bg-primary hover:bg-blue-600"
              }`}
              value={l.value}
            >
              {l.icon}
              {l.label}
            </Button>
          ))}
        </section>
      </section>
      <section className="flex items-center gap-5">
        <ChatIcon />
        <Notifications />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <section className="flex justify-center items-center gap-2 cursor-pointer group/collapsible">
              <MyAvatar />
              <ChevronDown className="ml-auto scale-75 transition duration-300 transform group-data-[state=open]/collapsible:rotate-180" />
            </section>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuLabel>
              {`${currentUser?.firstname} ${currentUser?.lastname}`}{" "}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <UserPen />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </section>
  );
}
