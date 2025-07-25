import { useApolloClient } from "@apollo/client";
import { ChevronDown } from "lucide-react";
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
import { useLogoutMutation, UserRole } from "@/graphql/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import MyAvatar from "./MyAvatar";
import Notifications from "./Notification/Notifications";
import ChatIcon from "./ChatIcon";
import { Button } from "@heroui/react";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRole } from "@/services/hooks/useRole";
import { useHasPermission } from "@/services/hooks/hasPermission";
import { PERMISSIONS } from "@/services/constants";
import InteractiveHoverButton from "./InteractiveHoverButton";

type Link = {
  id: number;
  value: string;
  label: string;
  icon?: ReactElement;
};

export default function Navigation() {
  const client = useApolloClient();
  const location = useLocation();
  const isCoach = useRole(UserRole.Coach);
  const isStudent = useRole(UserRole.Student);
  const isAdmin = useRole(UserRole.Admin);
  const path = location.pathname;
  const splitPath = path.split("/")[1];
  const currentUser = useUserStore((state) => state.user);
  const canManageMessage = useHasPermission(PERMISSIONS.MANAGE_MESSAGE);
  const canManageCrew = useHasPermission(PERMISSIONS.MANAGE_CREW);
  const links: Link[] = [
    {
      id: 1,
      value: "home",
      label: "Accueil",
    },
    ...(isCoach
      ? [
          {
            id: 2,
            value: "students",
            label: "Mes élèves",
          },
          ...(canManageCrew
            ? [
                {
                  id: 3,
                  value: "crew",
                  label: "Mes équipes",
                },
              ]
            : []),
        ]
      : []),
    ...(isStudent
      ? [
          {
            id: 4,
            value: "coach",
            label: "Besoin d'un coach ?",
          },
          {
            id: 5,
            value: "marketplace",
            label: "Besoin d'un plan d'entraînement ?",
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
                <p className="transition-all duration-200 group-hover:translate-x-1">
                  {l.label}
                </p>
              </div>
            </Button>
          ))}
          <InteractiveHoverButton />
        </section>
      </section>
      <section className="flex items-center gap-5">
        {canManageMessage && <ChatIcon />}
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
                className="flex justify-start"
              >
                <FaUserEdit />
                Profil
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin")}
                  className="flex justify-start"
                >
                  <MdAdminPanelSettings />
                  Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <HiOutlineLogout />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </section>
  );
}
