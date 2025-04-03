import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input, Radio, RadioGroup, User } from "@heroui/react";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import { Separator } from "../ui/separator";
import { uploadURL } from "@/services/utils";
import imgDefault from "../../../public/default.jpg";

type ChatModalProps = {
  open: boolean;
  onClose: () => void;
  users: UserWithoutPassword[];
  setActiveUser: (user: UserWithoutPassword) => void;
  setSearch: (value: string) => void;
};

export default function ChatModal({
  open,
  onClose,
  users,
  setActiveUser,
  setSearch,
}: ChatModalProps) {
  const [input, setInput] = useState<string>("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected("");
  }, [onClose]);

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={onClose}
      size="lg"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent className="max-h-[550px] max-w-[35rem]">
        <ModalHeader className="w-full h-full flex flex-col items-center justify-center gap-4">
          <p>Démarrer une nouvelle conversation</p>
          <Separator />
          <Input
            labelPlacement="outside"
            placeholder="Rechercher"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
              setSearch(e.target.value);
            }}
            startContent={
              <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
        </ModalHeader>
        <ModalBody style={{ gap: "15px" }} className="h-full">
          <section className="w-full flex flex-col items-start justify-start">
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="w-full"
            >
              {users?.map((user) => (
                <Radio
                  value={user.id}
                  key={user.id}
                  className="m-0 bg-content1 hover:bg-content2 gap-0 items-center justify-between flex-row-reverse max-w-full cursor-pointer rounded-lg p-2 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:border-opacity-50 data-[selected=true]:bg-content2"
                >
                  <User
                    avatarProps={{
                      src: user.avatar
                        ? `${uploadURL + user.avatar}`
                        : imgDefault,
                    }}
                    name={user.firstname + " " + user.lastname}
                  />
                </Radio>
              ))}
            </RadioGroup>
          </section>
        </ModalBody>
        <ModalFooter className="flex justify-end items-center gap-2">
          <Button
            type="button"
            className="bg-primary hover:bg-blue-600 w-full"
            disabled={selected.length === 0}
            onClick={() => {
              const userSelected = users.find((user) => user.id === selected);
              onClose();
              setSelected("");
              if (userSelected) setActiveUser(userSelected);
            }}
          >
            Discuter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
