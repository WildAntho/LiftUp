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
import { Crew, useGetCoachCrewsQuery } from "@/graphql/hooks";
import { Button } from "../ui/button";
import { useStudentStore } from "@/services/zustand/studentStore";
import { useCrewStore } from "@/services/zustand/crewStore";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import ListCrew from "../ListCrew";

type SelectCrewModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  closeNav: () => void;
};

export default function SelectCrewModal({
  open,
  setOpen,
  closeNav,
}: SelectCrewModalProps) {
  const [input, setInput] = useState<string>("");
  const currentCrew = useCrewStore((state) => state.crew);
  const setCrew = useCrewStore((state) => state.set);
  const clearStudent = useStudentStore((state) => state.clear);
  const [selected, setSelected] = useState(currentCrew?.id ?? "");
  const { data: dataCrews } = useGetCoachCrewsQuery({
    fetchPolicy: "cache-and-network",
  });
  const myCrews = dataCrews?.getCoachCrews ?? [];

  const handleClose = () => {
    setOpen(false);
    setInput("");
    setSelected("");
  };

  const handleSelectStudent = () => {
    const selectedCrew = myCrews.find((s) => s.id === selected);
    if (selectedCrew) {
      clearStudent();
      setCrew({
        id: selectedCrew.id,
        name: selectedCrew.name,
      });
      handleClose();
      closeNav();
    }
  };

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
          <p>Sélectionner une équipe</p>
          <Separator />
          <Input
            labelPlacement="outside"
            placeholder="Rechercher"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
            }}
            startContent={
              <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
        </ModalHeader>
        <ModalBody style={{ gap: "15px" }} className="min-h-[50vh]">
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            className="w-full"
          >
            {myCrews.map((s) => (
              <ListCrew key={s.id} crew={s as Crew} />
            ))}
          </RadioGroup>
        </ModalBody>
        <ModalFooter className="flex flex-col justify-end items-center gap-2">
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
