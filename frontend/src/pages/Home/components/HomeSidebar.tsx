import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CollapseItem from "./CollapseItem";
import { SidebarComponent } from "@/type";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { HandCoins, Handshake, NotepadText, SquareUser } from "lucide-react";
import UserProfile from "./UserProfile";
import SearchInput from "./SearchInput";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import {
  Crew,
  useGetCoachCrewsLazyQuery,
  useGetCoachLazyQuery,
  useGetStudentsLazyQuery,
} from "@/graphql/hooks";

type HomeSidebarProps = {
  currentUser: UserWithoutPassword | null;
};

export default function HomeSidebar({ currentUser }: HomeSidebarProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const prevInputRef = useRef<string>(input);
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const [myStudents, setMyStudents] = useState<UserWithoutPassword[]>([]);
  const ROLE_COACH = "COACH";
  const isCoach = currentUser?.roles === ROLE_COACH;
  const [getCoach, { data: dataCoach, loading: loadingCoach }] =
    useGetCoachLazyQuery({
      variables: { id: currentUser ? currentUser.id.toString() : "" },
    });
  const [getStudents, { data: dataStudents, loading: loadingStudents }] =
    useGetStudentsLazyQuery({
      variables: {
        id: currentUser ? currentUser.id.toString() : "",
        input: input ? input : "",
        limit,
        page,
      },
      fetchPolicy: "cache-and-network",
    });
  const [getCrews, { data: dataCrews, loading: loadingCrews }] =
    useGetCoachCrewsLazyQuery();

  const allStudents = dataStudents?.getStudents.students ?? [];

  useEffect(() => {
    // Cas n°1: Chargement initial et lorsque l'input est vidé
    if (
      (input.length === 0 && prevInputRef.current.length > 0) ||
      myStudents.length === 0
    ) {
      setMyStudents(allStudents as UserWithoutPassword[]);
    } 
    // Cas n°2: Si l'utilisateur tape dans l'input
    else if (
      input.length > 0 &&
      prevInputRef.current.length !== input.length
    ) {
      setMyStudents(allStudents as UserWithoutPassword[]);
    } 
    // Cas n°3: Si l'utilisateur charge plus de student (page + 1)
    else {
      setMyStudents((prev) => [
        ...prev,
        ...(allStudents as UserWithoutPassword[]),
      ]);
    }
    prevInputRef.current = input;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStudents]);

  const totalStudents = dataStudents?.getStudents.totalCount ?? 0;
  const lastPage = Math.ceil(totalStudents / limit);
  const isLastPageStudents = lastPage === page;
  const myCoach = dataCoach?.getUserById?.coach
    ? [dataCoach.getUserById.coach]
    : [];
  const myCrews = dataCrews?.getCoachCrews ?? [];

  const handleGetStudents = (): void => {
    getStudents();
  };

  const handleGetCoach = (): void => {
    getCoach();
  };

  const handleGetCrews = (): void => {
    getCrews();
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
    ...(isCoach
      ? [
          {
            title: "Mes élèves",
            data: myStudents as UserWithoutPassword[],
            loading: loadingStudents,
            get: handleGetStudents,
            icon: <SquareUser className="size-5" />,
            type: "user",
            isLastPage: isLastPageStudents,
          },
          {
            title: "Mes équipes",
            data: myCrews as Crew[],
            loading: loadingCrews,
            get: handleGetCrews,
            icon: <Handshake className="size-5" />,
            type: "crew",
          },
        ]
      : [
          {
            title: "Mon coach",
            data: myCoach as UserWithoutPassword[],
            loading: loadingCoach,
            get: handleGetCoach,
            icon: <HandCoins className="size-5" />,
            type: "user",
          },
        ]),
    {
      title: "Mes entraînements",
      data: [],
      loading: false,
      icon: <NotepadText className="size-5" />,
      type: "content",
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
      <div className="flex flex-col items-center justify-start pr-4 pl-4 pb-2 pt-7 overflow-y-scroll w-full h-[90%]">
        <div className="flex flex-col gap-10 w-full">
          {isCoach && (
            <SearchInput open={open} setInput={setInput} setPage={setPage} />
          )}
          {sidebarConfig.map((s, i) => (
            <div key={s.title}>
              <CollapseItem
                onClick={s.get}
                loading={s.loading}
                open={open}
                title={s.title}
                data={s.data}
                icon={s.icon}
                type={s.type}
                setPage={setPage}
                page={page}
                isLastPage={s.isLastPage}
                input={input}
              />
              {i < sidebarConfig.length - 1 && (
                <SidebarSeparator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>
      <UserProfile open={open} />
    </motion.section>
  );
}
