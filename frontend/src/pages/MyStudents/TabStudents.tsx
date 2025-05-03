import Delete from "@/components/Delete";
import PaginationBar from "@/components/PaginationBar";
import {
  useActivateMemberShipMutation,
  useDeleteStudentMutation,
  useGetCoachCrewsQuery,
  useGetOneCoachOffersQuery,
  useGetStudentsQuery,
  useRenewMemberShipMutation,
} from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  AlarmClock,
  AlarmClockOff,
  BadgeEuro,
  CircleCheckBig,
  Handshake,
  Hourglass,
  Loader2,
  SearchIcon,
  Users,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import imgDefault from "../../../public/default.jpg";
import { uploadURL } from "@/services/utils";
import Activate from "@/components/Activate";
import { addMonths, differenceInDays } from "date-fns";
import Renew from "@/components/Renew";
import StatusStudentCard from "./components/StatusStudentCard";
import { StatusStudent } from "@/type";
import ConfirmModal from "@/components/modals/ConfirmModal";

type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  team: string;
  offer: string;
  offerId: string;
  remaining: number;
  endMembership: string;
  memberShipId?: string;
};

type TabStudentProps = {
  refetch?: {
    refetchTotal: () => void;
  };
};

export default function TabStudent({ refetch }: TabStudentProps) {
  const currentUser = useUserStore((state) => state.user);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<StatusStudent | null>(null);
  const [input, setInput] = useState<string>("");
  const [offer, setOffer] = useState<string>("");
  const [crew, setCrew] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const tabLimitStudent = [
    {
      key: 10,
      label: "10",
    },
    {
      key: 20,
      label: "20",
    },
    {
      key: 30,
      label: "30",
    },
    {
      key: 40,
      label: "40",
    },
    {
      key: 50,
      label: "50",
    },
  ];
  const [sortRemaining, setSortRemaining] = useState<boolean>(false);
  const { data: dataOffers } = useGetOneCoachOffersQuery({
    variables: { id: currentUser?.id.toString() as string },
    fetchPolicy: "cache-and-network",
  });
  const allOffers = dataOffers?.getOneCoachOffers ?? [];
  const noCrew = {
    id: "none",
    name: "Aucune",
  };
  const { data: dataCrews } = useGetCoachCrewsQuery({
    fetchPolicy: "cache-and-network",
  });
  const allCrews = [noCrew, ...(dataCrews?.getCoachCrews ?? [])];
  const {
    data: dataStudents,
    loading: loadingStudents,
    refetch: refetchStudents,
  } = useGetStudentsQuery({
    variables: {
      id: currentUser!.id.toString(),
      input: input,
      offerId: offer,
      crewId: crew,
      status: activeCard,
      sortRemaining,
      page,
      limit,
    },
    fetchPolicy: "cache-and-network",
  });
  const myStudents = dataStudents?.getStudents.students ?? [];
  const totalStudents = dataStudents?.getStudents.totalCount ?? 1;
  const totalPage = Math.ceil(totalStudents / limit);
  const [deleteStudent, { loading }] = useDeleteStudentMutation();
  const [activeMemberShip, { loading: loadingActivate }] =
    useActivateMemberShipMutation();
  const [renewMembership, { loading: loadingRenew }] =
    useRenewMemberShipMutation();
  const handleDeleteStudent = async (studentId: string) => {
    await deleteStudent({
      variables: {
        data: {
          coach_id: currentUser?.id.toString() as string,
          student_id: studentId,
        },
      },
    });
    refetch?.refetchTotal();
    refetchStudents();
  };
  const handleActiveMemberShip = async (studentId: string, offerId: string) => {
    await activeMemberShip({
      variables: {
        data: {
          studentId,
          offerId,
        },
      },
    });
    refetchStudents();
  };
  const handleRenewMembership = async (membershipId: string) => {
    await renewMembership({
      variables: {
        id: membershipId,
      },
    });
    refetchStudents();
  };
  const handleSortChange = () => {
    setSortRemaining(!sortRemaining);
  };
  const loadingState = loadingStudents ? "loading" : "idle";
  const columns = [
    { name: "ELEVES", uid: "name" },
    { name: "OFFRE SOUSCRITE", uid: "offer" },
    { name: "EQUIPE", uid: "team" },
    { name: "TEMPS RESTANT", uid: "remaining" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users: UserType[] = myStudents.map((student) => ({
    id: student.id,
    name: student.firstname + " " + student.lastname,
    email: student.email,
    avatar: student.avatar ? `${uploadURL + student.avatar}` : imgDefault,
    team: student.crew ? student.crew.name : "Aucune équipe",
    offer: student.studentOffer ? student.studentOffer.name : "Aucune offre",
    offerId: student.studentOffer ? student.studentOffer.id : "Aucune offre",
    memberShipId:
      student && student?.memberships ? student?.memberships[0]?.id : "",
    endMembership:
      student.studentOffer?.durability &&
      student.memberships &&
      student.memberships.length > 0 &&
      student.memberships[0].endDate &&
      student.memberships[0].endDate
        ? addMonths(
            new Date(student.memberships[0].endDate).getTime() >
              new Date().getTime()
              ? new Date(student.memberships[0].endDate).getTime()
              : new Date(),
            student.studentOffer?.durability
          ).toISOString()
        : "",
    remaining:
      student.memberships &&
      student.memberships.length > 0 &&
      student.memberships[0].endDate &&
      differenceInDays(student.memberships[0].endDate, new Date()),
  }));
  const renderCell = useCallback(
    (user: UserType, columnKey: keyof UserType | "actions" | "remaining") => {
      const cellValue = user[columnKey as keyof UserType];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ src: user.avatar }}
              description={user.email}
              name={cellValue as string}
            >
              {user.email}
            </User>
          );
        case "offer":
          return <p className="truncate text-xs">{user.offer}</p>;
        case "team":
          return <p className="text-xs">{user.team}</p>;
        case "remaining": {
          let text = "";
          let textColor = "";
          let bgColor = "";

          if (user.remaining > 0) {
            text = `${user.remaining} jour${user.remaining > 1 ? "s" : ""}`;
            if (user.remaining < 8) {
              textColor = "text-red-700";
              bgColor = "bg-red-100";
            } else if (user.remaining < 15) {
              textColor = "text-orange-700";
              bgColor = "bg-orange-100";
            } else {
              textColor = "text-green-700";
              bgColor = "bg-green-100";
            }
          } else if (user.endMembership) {
            text = "À renouveler";
            textColor = "text-red-700";
            bgColor = "bg-red-100";
          } else {
            text = "Inactif";
            textColor = "text-gray-700";
            bgColor = "bg-gray-200";
          }

          return (
            <span
              className={`px-3 py-1 rounded-full ${textColor} ${bgColor} text-xs`}
            >
              {text}
            </span>
          );
        }

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Delete
                onClick={() => {
                  setSelectedUserId(user.id);
                  setOpenConfirm(true);
                }}
              />
              {!user.remaining && !user.memberShipId && (
                <Activate
                  onActive={() => handleActiveMemberShip(user.id, user.offerId)}
                  loading={loadingActivate}
                  title="Démarrer le suivi"
                  description="Êtes-vous sûr de vouloir démarrer le suivi de cet élève ?"
                />
              )}
              {user.memberShipId && (
                <Renew
                  title="Renouveler le suivi"
                  description="Êtes-vous sûr de vouloir renouveler le suivi ?"
                  loading={loadingRenew}
                  onRenew={() => handleRenewMembership(user.memberShipId!)}
                  endDate={user.endMembership}
                />
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading]
  );

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setInput(value);
    } else {
      setInput("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <section className="relative flex flex-col justify-center items-between gap-2 w-[100%]">
        <section className="flex justify-between items-center gap-10 w-[100%]">
          <Input
            isClearable
            placeholder="Rechercher un élève"
            className="w-[40%]"
            radius="sm"
            startContent={<SearchIcon />}
            value={input}
            onValueChange={onSearchChange}
            onClear={() => setInput("")}
          />
          <section className="flex items-center justify-end gap-1 flex-1">
            <Select
              className="max-w-xs"
              labelPlacement="outside"
              placeholder="Offre"
              radius="sm"
              aria-label="Filtrer par offre"
              startContent={<BadgeEuro />}
              selectedKeys={[offer]}
              onChange={(e) => setOffer(e.target.value)}
            >
              {allOffers.map((offer) => (
                <SelectItem key={offer.id}>{offer.name}</SelectItem>
              ))}
            </Select>
            <Select
              className="max-w-xs m-0"
              labelPlacement="outside"
              placeholder="Equipe"
              radius="sm"
              aria-label="Filtrer par équipe"
              startContent={<Handshake />}
              selectedKeys={[crew]}
              onChange={(e) => setCrew(e.target.value)}
            >
              <>
                {allCrews.map((crew) => (
                  <SelectItem key={crew.id}>{crew.name}</SelectItem>
                ))}
              </>
            </Select>
          </section>
        </section>
        <div className="flex items-center justify-between px-3">
          <p className="text-xs text-gray-500">
            Nombre d'élèves: {totalStudents}
          </p>
          <p
            className="text-xs text-gray-500 hover:underline cursor-pointer"
            onClick={() => {
              setCrew("");
              setOffer("");
              setInput("");
            }}
          >
            Réinitialiser les filtres
          </p>
        </div>
      </section>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, myStudents]);

  return (
    <section className="w-full h-full flex flex-col items-center justify-start gap-5">
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
          setSelectedUserId(null);
        }}
        description="Êtes-vous sûr de vouloir supprimer cet élève ?"
        onConfirm={() => handleDeleteStudent(selectedUserId as string)}
        loading={loading}
      />
      <section className="w-full flex justify-start items-center gap-4">
        <div onClick={() => setActiveCard(null)}>
          <StatusStudentCard
            icon={<Users />}
            title="Tous"
            description="Tous les élèves"
            isActive={!activeCard}
          />
        </div>
        <div onClick={() => setActiveCard(StatusStudent.active)}>
          <StatusStudentCard
            icon={<CircleCheckBig />}
            title="Actifs"
            description="Coaching en cours"
            type={StatusStudent.active}
            isActive={activeCard === StatusStudent.active}
          />
        </div>
        <div onClick={() => setActiveCard(StatusStudent.waiting)}>
          <StatusStudentCard
            icon={<Hourglass />}
            title="En attente"
            description="Inscription à valider"
            type={StatusStudent.waiting}
            isActive={activeCard === StatusStudent.waiting}
          />
        </div>
        <div onClick={() => setActiveCard(StatusStudent.end_7)}>
          <StatusStudentCard
            icon={<AlarmClock />}
            title="Fin proche"
            description="Fin dans moins de 8 jours"
            type={StatusStudent.end_7}
            isActive={activeCard === StatusStudent.end_7}
          />
        </div>
        <div onClick={() => setActiveCard(StatusStudent.expired)}>
          <StatusStudentCard
            icon={<AlarmClockOff />}
            title="Expirés"
            description="Coaching terminés"
            type={StatusStudent.expired}
            isActive={activeCard === StatusStudent.expired}
          />
        </div>
      </section>
      <Table
        isHeaderSticky
        onSortChange={handleSortChange}
        sortDescriptor={{
          column: "remaining",
          direction: sortRemaining ? "ascending" : "descending",
        }}
        bottomContent={
          <div className="relative flex w-full justify-center items-center">
            <PaginationBar setPage={setPage} page={page} total={totalPage} />
            <div className="w-[30%] absolute right-0 flex justify-end items-center gap-2">
              <p className="text-xs">Elèves par page</p>
              <Select
                className="w-20"
                size="sm"
                aria-label="Nombre d'élève affiché"
                labelPlacement="outside-left"
                selectedKeys={[limit.toString()]}
                defaultSelectedKeys={["20"]}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {tabLimitStudent.map((t) => (
                  <SelectItem key={t.key}>{t.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        }
        topContent={topContent}
        classNames={{
          table: "min-h-[200px]",
        }}
        aria-label="Table élèves"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              style={column.uid === "actions" ? { width: "100px" } : {}}
              allowsSorting={column.uid === "remaining"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {users.length ? (
          <TableBody
            items={users}
            loadingContent={<Loader2 />}
            loadingState={loadingState}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as keyof UserType | "actions")}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"Vous n'avez pas d'élève pour le moment"}>
            {[]}
          </TableBody>
        )}
      </Table>
    </section>
  );
}
