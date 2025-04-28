import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import CollapseItem from "./CollapseItem";
import { SidebarComponent } from "@/type";
import {
  BicepsFlexed,
  Calendar,
  ChartNoAxesCombined,
  Dumbbell,
  Gauge,
  HandCoins,
  NotepadText,
} from "lucide-react";
import UserProfile from "./UserProfile";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Crew, useGetCoachLazyQuery } from "@/graphql/hooks";
import SelectStudentModal from "@/components/modals/SelectStudentModal";
import SelectCrewModal from "@/components/modals/SelectCrewModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import SubItems from "./SubItems";
import { Separator } from "@/components/ui/separator";

type HomeSidebarProps = {
  currentUser: UserWithoutPassword | null;
};

export default function HomeSidebar({ currentUser }: HomeSidebarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = searchParams.get("tab");
  const isCalendar = params === "calendar";
  const [open, setOpen] = useState(false);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openCrewModal, setOpenCrewModal] = useState(false);
  const ROLE_COACH = "COACH";
  const isCoach = currentUser?.roles === ROLE_COACH;
  const [getCoach, { data: dataCoach, loading: loadingCoach }] =
    useGetCoachLazyQuery({
      variables: { id: currentUser ? currentUser.id.toString() : "" },
    });

  const myCoach = dataCoach?.getUserById?.coach
    ? [dataCoach.getUserById.coach]
    : [];

  const handleGetCoach = (): void => {
    getCoach();
  };

  const parentVariants = {
    hidden: {
      width: "60px",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3,
      },
    },
    visible: {
      width: "400px",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const sidebarConfig: SidebarComponent[] = [
    {
      title: "Tableau de bord",
      value: "dashboard",
      withArrow: true,
      icon: <Gauge className="size-5" />,
      type: "content",
      get: () => navigate("/home"),
    },
    {
      title: "Calendrier",
      value: "calendar",
      withArrow: true,
      rotateArrow: isCalendar,
      icon: <Calendar className="size-5" />,
      get: () => navigate("/home?tab=calendar"),
      type: "content",
      subitems: isCoach
        ? [
            {
              title: "Sélectionner un élève",
              withArrow: false,
              get: () => setOpenStudentModal(true),
              type: "user",
            },
            {
              title: "Sélectionner une équipe",
              withArrow: false,
              get: () => setOpenCrewModal(true),
              type: "crew",
            },
          ]
        : undefined,
    },
    ...(isCoach
      ? [
          {
            title: "Programmes",
            value: "program",
            withArrow: true,
            icon: <BicepsFlexed className="size-5" />,
            type: "content",
            get: () => navigate("/home?tab=program"),
          },
        ]
      : []),
    ...(!isCoach
      ? [
          {
            title: "Mon coach",
            withArrow: true,
            data: myCoach as UserWithoutPassword[],
            loading: loadingCoach,
            get: handleGetCoach,
            icon: <HandCoins className="size-5" />,
            type: "user",
          },
        ]
      : []),
    {
      title: "Entraînements",
      value: "training",
      get: () => navigate("/home?tab=training"),
      withArrow: true,
      icon: <NotepadText className="size-5" />,
      type: "content",
    },
    {
      title: "Exercices",
      value: "exercices",
      withArrow: true,
      icon: <Dumbbell className="size-5" />,
      type: "content",
      get: () => navigate("/home?tab=exercices"),
    },
    {
      title: "Statistiques",
      value: "statistics",
      withArrow: true,
      icon: <ChartNoAxesCombined className="size-5" />,
      type: "content",
      get: () => navigate("/home?tab=statistics"),
    },
  ];

  return (
    <motion.section
      className="flex flex-col justify-between items-start bg-white rounded-2xl overflow-hidden"
      variants={parentVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SelectStudentModal
        open={openStudentModal}
        setOpen={setOpenStudentModal}
        closeNav={() => setOpen(false)}
      />
      <SelectCrewModal
        open={openCrewModal}
        setOpen={setOpenCrewModal}
        closeNav={() => setOpen(false)}
      />
      <div
        className={`flex flex-col items-center justify-start px-2 pb-2 pt-7 w-full h-[90%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}
      >
        <div className="flex flex-col w-full gap-1">
          {sidebarConfig.map((s) => (
            <React.Fragment key={s.title}>
              <motion.div
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 600 }}
                className={`group ${
                  s.withArrow
                    ? "hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                    : "hover:bg-none"
                } rounded-md py-2 cursor-pointer ${
                  ((!params && s.value === "dashboard") ||
                    s.value === params) &&
                  "bg-primary bg-opacity-10 text-primary"
                }`}
                onClick={s.get}
              >
                <CollapseItem
                  open={open}
                  title={s.title}
                  data={s.data as UserWithoutPassword[] | Crew[]}
                  icon={s.icon}
                  type={s.type}
                  withArrow={s.withArrow}
                  rotateArrow={s.rotateArrow}
                  subitems={s.subitems}
                />
              </motion.div>
              {s.subitems && s.subitems?.length > 0 && isCalendar && (
                <div className="flex h-full w-full justify-start items-center pl-5 py-1">
                  <Separator className="h-full" orientation="vertical" />
                  <div className="flex flex-col w-full">
                    {s.subitems.map((subitem) => (
                      <SubItems
                        key={subitem.title}
                        title={subitem.title}
                        open={open}
                        get={subitem.get}
                      />
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <UserProfile open={open} />
    </motion.section>
  );
}
