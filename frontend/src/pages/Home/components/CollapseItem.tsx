import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ReactElement } from "react";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Crew } from "@/graphql/hooks";
import { SidebarComponent } from "@/type";

type CollapseItemProps = {
  title: string;
  open: boolean;
  withArrow: boolean;
  rotateArrow?: boolean;
  data: (UserWithoutPassword | Crew)[];
  icon?: ReactElement;
  type: string;
  subitems?: SidebarComponent[];
};

export default function CollapseItem(props: CollapseItemProps) {
  const childVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
    },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <section
      className={`flex items-center justify-between w-full h-5 cursor-pointer px-2 ${
        props.withArrow ? "py-4" : "text-xs py-1"
      }`}
    >
      <div className="h-full flex justify-center items-center gap-5">
        <div className="pl-[3px]">{props?.icon}</div>
        <AnimatePresence>
          {props.open && (
            <motion.p
              variants={childVariants}
              animate="enter"
              exit="exit"
              initial="initial"
              className={`${
                !props.withArrow ? "ml-8" : ""
              } text-sm transition transform group-hover:translate-x-1`}
            >
              {props.title}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {props.open && props.withArrow && (
          <motion.div
            variants={childVariants}
            animate="enter"
            exit="exit"
            initial="initial"
          >
            <ChevronRight
              className={`ml-auto scale-75 transition duration-200 transform ${
                props.rotateArrow && "rotate-90"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
