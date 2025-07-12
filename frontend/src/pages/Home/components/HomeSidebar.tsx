import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import CollapseItem from "./CollapseItem";
import { SidebarComponent } from "@/type";
import UserProfile from "./UserProfile";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Crew, UserRole } from "@/graphql/hooks";
import SelectStudentModal from "@/components/modals/SelectStudentModal";
import SelectCrewModal from "@/components/modals/SelectCrewModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import SubItems from "./SubItems";
import { Separator } from "@/components/ui/separator";
import { IoCalendar } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { TbDashboardFilled } from "react-icons/tb";
import { TbCoinEuroFilled } from "react-icons/tb";
import { FaDumbbell } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { useRole } from "@/services/hooks/useRole";

export default function HomeSidebar() {
  const navigate = useNavigate();
  const isCoach = useRole(UserRole.Coach)
  const [searchParams] = useSearchParams();
  const params = searchParams.get("tab");
  const isCalendar = params === "calendar";
  const [open, setOpen] = useState(false);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openCrewModal, setOpenCrewModal] = useState(false);

  const parentVariants = {
    hidden: {
      width: "70px",
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
      icon: <TbDashboardFilled className="size-6" />,
      type: "content",
      get: () => navigate("/home"),
    },
    {
      title: "Calendrier",
      value: "calendar",
      withArrow: true,
      rotateArrow: isCalendar && isCoach,
      icon: <IoCalendar className="size-6" />,
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
            icon: <FaFire className="size-6" />,
            type: "content",
            get: () => navigate("/home?tab=program"),
          },
          {
            title: "Offres",
            value: "offers",
            get: () => navigate("/home?tab=offers"),
            withArrow: true,
            icon: <TbCoinEuroFilled className="size-[25px]" />,
            type: "content",
          },
        ]
      : []),
    ...(!isCoach
      ? [
          {
            title: "Coaching",
            value: "coaching",
            withArrow: true,
            icon: <FaChalkboardUser className="size-6" />,
            type: "content",
            get: () => navigate("/home?tab=coaching"),
          },
        ]
      : []),
    {
      title: "Exercices",
      value: "exercices",
      withArrow: true,
      icon: <FaDumbbell className="size-[22px]" />,
      type: "content",
      get: () => navigate("/home?tab=exercices"),
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
                className={`group hover:bg-dark/5 rounded-md py-2 cursor-pointer text-gray-600 ${
                  ((!params && s.value === "dashboard") ||
                    s.value === params) &&
                  "bg-primary/10 text-primary font-semibold"
                } ${!open ? "flex justify-center" : ""}`}
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
      <div className="pl-1 w-full">
        <UserProfile open={open} />
      </div>
    </motion.section>
  );
}
