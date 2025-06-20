import { useApolloClient } from "@apollo/client";
import {
  BicepsFlexed,
  BookOpen,
  ChevronDown,
  Handshake,
  HomeIcon,
  LogOut,
  Settings,
  UserPen,
  Users,
} from "lucide-react";
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
import MyAvatar from "./MyAvatar";
import Notifications from "./Notification/Notifications";
import ChatIcon from "./ChatIcon";
import { Button } from "@heroui/react";

type Link = {
  id: number;
  value: string;
  label: string;
  icon?: ReactElement;
};

export default function Navigation() {
  const client = useApolloClient();
  const location = useLocation();
  const path = location.pathname;
  const splitPath = path.split("/")[1];
  const currentUser = useUserStore((state) => state.user);
  const ROLE_COACH = "COACH";
  const ROLE_STUDENT = "STUDENT";
  const isCoach = currentUser?.roles === ROLE_COACH;
  const isStudent = currentUser?.roles === ROLE_STUDENT;
  const links: Link[] = [
    {
      id: 1,
      value: "home",
      label: "Accueil",
      icon: <HomeIcon size={16} />,
    },
    ...(isCoach
      ? [
          {
            id: 2,
            value: "students",
            label: "Mes élèves",
            icon: <BookOpen size={16} />,
          },
          {
            id: 3,
            value: "crew",
            label: "Mes équipes",
            icon: <Users size={16} />,
          },
        ]
      : []),
    ...(isStudent
      ? [
          {
            id: 4,
            value: "coach",
            label: "Besoin d'un coach ?",
            icon: <Handshake size={16} />,
          },
          {
            id: 5,
            value: "program",
            label: "Besoin d'un plan d'entraînement ?",
            icon: <BicepsFlexed size={16} />,
          },
        ]
      : []),
  ];
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
    navigate("/login");
  };

  return (
    <section className="w-full h-full bg-white shadow-sm flex justify-between items-center pr-10 pl-10">
      <section className="flex justify-center items-center gap-20">
        <div className="w-[80px] cursor-pointer" onClick={() => navigate("/")}>
          <p
            data-testid="logo-liftup"
            className="font-logo text-primary text-5xl"
          >
            LiftUp
          </p>
        </div>
        <section className="flex justify-center items-center gap-3">
          {links.map((l: Link) => (
            <Button
              data-testid={l.label}
              key={l.id}
              radius="sm"
              onPress={() => {
                navigate(`${l.value}`);
              }}
              className={`group cursor-pointer h-[45px] min-w-[150px] bg-white hover:bg-gray-100 ${
                l.value === splitPath
                  ? "bg-dark hover:bg-dark text-white"
                  : "text-black"
              }`}
              value={l.value}
            >
              <div className="flex justify-center items-center gap-2 text-sm">
                {l.icon}
                <p className="transition-all duration-200 group-hover:translate-x-1">
                  {l.label}
                </p>
              </div>
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
              <DropdownMenuItem
                onClick={() => navigate("/profile?tab=informations")}
              >
                <UserPen />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/profile?tab=settings")}
              >
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
