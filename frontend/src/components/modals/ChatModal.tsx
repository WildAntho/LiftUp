import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useState } from "react";
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

export default function OfferModal({
  open,
  onClose,
  users,
  setActiveUser,
  setSearch,
}: ChatModalProps) {
  const [input, setInput] = useState<string>("");
  const [selected, setSelected] = useState("");

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={open}
      onOpenChange={onClose}
      size="2xl"
      isDismissable={false}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent className="min-h-[550px]">
        <ModalHeader className="w-full h-full flex justify-center">
          <p>Démarrer une nouvelle conversation</p>
        </ModalHeader>
        <ModalBody style={{ gap: "15px" }} className="h-full">
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
          <Separator />
          <section className="flex flex-col items-start justify-start gap-3 pl-5">
            <RadioGroup value={selected} onValueChange={setSelected}>
              {users?.map((user) => (
                <Radio
                  value={user.id}
                  key={user.id}
                  className="flex justify-start items-center gap-5 cursor-pointer"
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            type="button"
            className="bg-primary hover:bg-blue-600"
            onClick={() => {
              const userSelected = users.find((user) => user.id === selected);
              onClose();
              setSelected("");
              if (userSelected) setActiveUser(userSelected);
            }}
          >
            Valider
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
