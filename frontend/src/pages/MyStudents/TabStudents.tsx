import Delete from "@/components/Delete";
import PaginationBar from "@/components/PaginationBar";
import SelectStudentModal from "@/components/modals/SelectStudentModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteStudentMutation,
  useGetCoachCrewsQuery,
  useGetOneCoachOffersQuery,
  useGetStudentsQuery,
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
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { BadgeEuro, Handshake, Loader2, Plus, SearchIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import imgDefault from "../../../public/default.jpg";
import { uploadURL } from "@/services/utils";

type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  team: string;
  offer: string;
};

export default function TabStudent() {
  const currentUser = useUserStore((state) => state.user);
  const [input, setInput] = useState<string>("");
  const [offer, setOffer] = useState<string>("");
  const [crew, setCrew] = useState<string>("");
  const { data: dataOffers } = useGetOneCoachOffersQuery({
    variables: { id: currentUser?.id.toString() as string },
  });
  const allOffers = dataOffers?.getOneCoachOffers ?? [];
  const noCrew = {
    id: "none",
    name: "Aucune",
  };
  const { data: dataCrews } = useGetCoachCrewsQuery();
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
    },
    fetchPolicy: "cache-and-network",
  });
  const myStudents = dataStudents?.getStudents[0]?.students ?? [];
  const [deleteStudent, { loading }] = useDeleteStudentMutation();
  const handleDeleteStudent = async (studentId: string) => {
    await deleteStudent({
      variables: {
        data: {
          coach_id: currentUser?.id.toString() as string,
          student_id: studentId,
        },
      },
    });
    refetchStudents();
  };
  const loadingState = loadingStudents ? "loading" : "idle";
  const columns = [
    { name: "ELEVES", uid: "name" },
    { name: "OFFRE SOUSCRITE", uid: "offer" },
    { name: "EQUIPE", uid: "team" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users: UserType[] = myStudents.map((student) => ({
    id: student.id,
    name: student.firstname + " " + student.lastname,
    email: student.email,
    avatar: student.avatar ? `${uploadURL + student.avatar}` : imgDefault,
    team: student.crew ? student.crew.name : "Aucune équipe",
    offer: student.studentOffer ? student.studentOffer.name : "Aucune offre",
  }));
  const renderCell = useCallback(
    (user: UserType, columnKey: keyof UserType | "actions") => {
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
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Delete
                onDelete={() => handleDeleteStudent(user.id)}
                loading={loading}
                title="Supprimer l'élève"
                description="Êtes-vous sûr de vouloir supprimer cet élève ?"
              />
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
          <section className="flex items-center gap-1 flex-1">
            <Select
              className="max-w-xs"
              labelPlacement="outside"
              placeholder="Offre"
              radius="sm"
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
            <Dialog>
              <DialogTrigger asChild>
                <Button color="primary" radius="sm" isIconOnly>
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-description="dialog-description"
                aria-describedby="dialog-description"
                className="h-[60%] flex flex-col justify-start items-center overflow-y-scroll"
              >
                <DialogHeader>
                  <DialogTitle>Sélectionner un élève</DialogTitle>
                </DialogHeader>
                <SelectStudentModal currentUser={currentUser} />
              </DialogContent>
            </Dialog>
          </section>
        </section>
        <div className="flex items-center justify-between px-3">
          <p className="text-xs text-gray-500">
            Nombre d'élèves: {myStudents.length}
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
    <section className="w-full flex flex-col items-center justify-start gap-5">
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells"
        bottomContent={
          <div className="flex w-full justify-center">
            <PaginationBar />
          </div>
        }
        topContent={topContent}
        classNames={{
          base: "max-h-[520px]",
          table: "min-h-[200px] overflow-scroll",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              style={column.uid === "actions" ? { width: "100px" } : {}}
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
