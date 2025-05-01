import {
  UserWithoutPassword,
  useUserStore,
} from "@/services/zustand/userStore";
import { useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RadioGroup,
} from "@heroui/react";
import { useGetStudentsQuery } from "@/graphql/hooks";
import ListUser from "../ListUsers";
import { Button } from "../ui/button";
import { useStudentStore } from "@/services/zustand/studentStore";
import { useCrewStore } from "@/services/zustand/crewStore";
import PaginationBar from "../PaginationBar";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useDebouncedCallback } from "@/services/useDebouncedCallback";
import SkeletonUser from "../SkeletonUser";

type SelectStudentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  closeNav: () => void;
};

export default function SelectStudentModal({
  open,
  setOpen,
  closeNav,
}: SelectStudentModalProps) {
  const [input, setInput] = useState<string>("");
  const [debounceInput, setDebounceInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const currentUser = useUserStore((state) => state.user);
  const currentStudent = useStudentStore((state) => state.student);
  const setStudent = useStudentStore((state) => state.set);
  const clearCrew = useCrewStore((state) => state.clear);
  const [selected, setSelected] = useState(currentStudent?.id ?? "");
  const [page, setPage] = useState<number>(1);
  const limit = 20;
  const { data: dataStudents } = useGetStudentsQuery({
    variables: {
      id: currentUser ? currentUser.id.toString() : "",
      input: debounceInput,
      limit,
      page,
    },
    fetchPolicy: "cache-and-network",
  });
  const myStudents = dataStudents?.getStudents.students ?? [];
  const totalPage = dataStudents?.getStudents.totalCount
    ? Math.ceil(dataStudents?.getStudents.totalCount / limit)
    : 0;

  const handleClose = () => {
    setOpen(false);
    setInput("");
    setDebounceInput("");
    setSelected("");
  };

  const handleSelectStudent = () => {
    const selectedStudent = myStudents.find((s) => s.id === selected);
    if (selectedStudent) {
      clearCrew();
      setStudent({
        id: selectedStudent.id,
        firstname: selectedStudent.firstname,
        lastname: selectedStudent.lastname,
        email: selectedStudent.email,
      });
      handleClose();
      closeNav();
    }
  };

  const skeletonLength = myStudents.length < 7 ? myStudents.length : 7;

  const debouncedSearch = useDebouncedCallback((value?: string) => {
    setDebounceInput(value ?? "");
    setLoading(false);
  }, 300);

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={handleClose}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full h-full flex flex-col items-center justify-center gap-4">
          <p>Sélectionner un élève</p>
          <Separator />
          <Input
            labelPlacement="outside"
            placeholder="Rechercher"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoading(true);
              setInput(e.target.value);
              debouncedSearch(e.target.value);
            }}
            startContent={
              <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
        </ModalHeader>
        <ModalBody style={{ gap: "15px" }} className="min-h-[50vh]">
          {!loading ? (
            <section>
              {myStudents.length > 0 ? (
                <RadioGroup
                  value={selected}
                  onValueChange={setSelected}
                  className="w-full"
                >
                  {myStudents.map((s) => (
                    <ListUser key={s.id} user={s as UserWithoutPassword} />
                  ))}
                </RadioGroup>
              ) : (
                <p className="w-full h-full text-center text-sm text-gray-600">
                  Vous n'avez aucun élève.
                </p>
              )}
            </section>
          ) : (
            <SkeletonUser skeletonLength={skeletonLength} />
          )}
        </ModalBody>
        <ModalFooter className="flex flex-col justify-end items-center gap-2">
          {totalPage > 1 && (
            <div className="flex w-full justify-center">
              <PaginationBar setPage={setPage} page={page} total={totalPage} />
            </div>
          )}
          <Button
            type="button"
            className="bg-primary hover:bg-blue-600 w-full"
            disabled={selected.length === 0}
            onClick={handleSelectStudent}
          >
            Sélectionner
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
