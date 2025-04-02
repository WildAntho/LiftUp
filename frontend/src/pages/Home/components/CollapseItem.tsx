import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { ReactElement } from "react";
import {
  UserWithoutPassword,
  useUserStore,
} from "@/services/zustand/userStore";
import { useStudentStore } from "@/services/zustand/studentStore";
import ListUsers from "@/components/ListUsers";
import { Crew } from "@/graphql/hooks";
import CrewCard from "@/components/CrewCard";
import { Button } from "@/components/ui/button";
import { useCrewStore } from "@/services/zustand/crewStore";

type CollapseItemProps = {
  title: string;
  open: boolean;
  data: (UserWithoutPassword | Crew)[];
  icon: ReactElement;
  type: string;
  onClick?: () => void;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  isLastPage?: boolean;
  input: string;
};

export default function CollapseItem(props: CollapseItemProps) {
  const currentUser = useUserStore((state) => state.user);
  const currentStudent = useStudentStore((state) => state.student);
  const setStudent = useStudentStore((state) => state.set);
  const clearStudent = useStudentStore((state) => state.clear);
  const currentCrew = useCrewStore((state) => state.crew);
  const setCrew = useCrewStore((state) => state.set);
  const clearCrew = useCrewStore((state) => state.clear);
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
  const handleGetStudent = (s: UserWithoutPassword) => {
    clearCrew();
    return (
      currentUser?.roles === "COACH" &&
      setStudent({
        id: s.id,
        firstname: s.firstname,
        lastname: s.lastname,
        email: s.email,
      })
    );
  };

  const handleGetCrew = (s: Crew) => {
    clearStudent();
    return (
      currentUser?.roles === "COACH" &&
      setCrew({
        id: s.id,
        name: s.name,
      })
    );
  };
  return (
    <Collapsible className="group/collapsible gap-5">
      <CollapsibleTrigger
        className="group flex items-center justify-between w-full h-5 gap-2"
        onClick={props.onClick}
      >
        <div className="flex justify-center items-center gap-2">
          <div>{props.icon}</div>
          <AnimatePresence>
            {props.open && (
              <motion.p
                variants={childVariants}
                animate="enter"
                exit="exit"
                initial="initial"
                className="text-sm transition transform group-hover:translate-x-1"
              >
                {props.title}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {props.open && (
            <motion.div
              variants={childVariants}
              animate="enter"
              exit="exit"
              initial="initial"
            >
              <ChevronDown className="ml-auto scale-75 transition duration-300 transform group-data-[state=open]/collapsible:rotate-180" />
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleTrigger>
      <div>
        {!props.loading && (
          <div className="pt-2">
            {props.data.length > 0 ? (
              <>
                {props.data.map((s, index) => {
                  if (props.type === "user") {
                    const user = s as UserWithoutPassword;
                    return (
                      props.open && (
                        <motion.div
                          key={user.id}
                          variants={childVariants}
                          animate="enter"
                          exit="exit"
                          initial="initial"
                        >
                          <CollapsibleContent className="flex flex-col justify-center items-center gap-4">
                            <ListUsers
                              handleGetStudent={handleGetStudent}
                              student={user}
                              currentStudent={currentStudent}
                            />
                            {index === props.data.length - 1 &&
                              !props.isLastPage &&
                              props.input.length === 0 && (
                                <p
                                  className="text-xs hover:underline text-blue-500 cursor-pointer"
                                  onClick={() => props.setPage(props.page + 1)}
                                >
                                  Voir plus
                                </p>
                              )}
                          </CollapsibleContent>
                        </motion.div>
                      )
                    );
                  } else if (props.type === "crew") {
                    const crew = s as Crew;
                    return (
                      props.open && (
                        <motion.div
                          key={crew.id}
                          variants={childVariants}
                          animate="enter"
                          exit="exit"
                          initial="initial"
                        >
                          <CollapsibleContent className="flex justify-start items-center gap-4">
                            <Button
                              variant="ghost"
                              className={`${
                                currentCrew && currentCrew.id === crew?.id
                                  ? "bg-primary bg-opacity-10 w-full text-primary justify-start gap-2 hover:text-primary"
                                  : "hover:bg-primary hover:bg-opacity-10 w-full justify-start gap-2"
                              } hover:bg-primary hover:bg-opacity-10 h-auto`}
                              onClick={() => handleGetCrew(s as Crew)}
                            >
                              <CrewCard
                                students={
                                  crew.students as UserWithoutPassword[]
                                }
                                id={crew.id}
                                name={crew.name}
                              />
                            </Button>
                          </CollapsibleContent>
                        </motion.div>
                      )
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              <motion.div
                variants={childVariants}
                animate="enter"
                exit="exit"
                initial="initial"
              >
                <CollapsibleContent className="pt-4 pl-2">
                  <p className="text-[12px] text-gray-400">
                    Vous n'avez pas d'élément
                  </p>
                </CollapsibleContent>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </Collapsible>
  );
}
