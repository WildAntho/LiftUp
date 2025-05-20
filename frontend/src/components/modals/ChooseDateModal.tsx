import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/react";
import { Workflow } from "lucide-react";
import DateInput from "../DateInput";

type ChooseDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  setStartDate: (value: string) => void;
  startDate: string;
};

export default function ChooseDateModal({
  isOpen,
  onClose,
  onGenerate,
  setStartDate,
  startDate,
}: ChooseDateModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      size="xl"
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <p className="pt-2">Choisissez la date de début du programme</p>
        </ModalHeader>
        <ModalBody>
          <DateInput date={startDate} setDate={setStartDate} />
        </ModalBody>
        <ModalFooter className="justify-end gap-2">
          <Button
            variant="bordered"
            onPress={onClose}
            radius="sm"
            className="border-1 hover:bg-gray-100 h-12"
          >
            Annuler
          </Button>
          <button
            className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={onGenerate}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-start gap-2 rounded-md bg-white hover:bg-gray-100 px-3 py-1 text-sm font-medium text-dark backdrop-blur-3xl">
              <Workflow className="w-4 h-4" />
              <p>Générer !</p>
            </span>
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
