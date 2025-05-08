import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button, Input } from "@heroui/react";

type DuplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  max: number;
  setCount: (value: number) => void;
  count: number;
  onDuplicate: () => void;
};

export default function DuplicationModal({
  isOpen,
  onClose,
  max,
  setCount,
  count,
  onDuplicate,
}: DuplicationModalProps) {
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
          <p className="pt-2">Dupliquer la semaine</p>
        </ModalHeader>
        <ModalBody>
          <section className="w-full flex flex-col items-start justify-start gap-4 my-4">
            <Input
              label={`Nombre de semaines max: ${max}`}
              type="number"
              description={`Vous ne pouvez dupliquer que ${max} semaine${
                max > 1 ? "s" : ""
              } maximum`}
              value={count.toString()}
              onValueChange={(value) => setCount(Number(value))}
            />
          </section>
        </ModalBody>
        <ModalFooter className="justify-end gap-2">
          <Button
            variant="bordered"
            onPress={onClose}
            radius="sm"
            className="border-1 hover:bg-gray-100"
          >
            Non
          </Button>
          <Button
            className={`group bg-dark text-white font-semibold`}
            radius="sm"
            onPress={() => {
              onDuplicate();
              if (count > 0) onClose();
              setCount(1);
            }}
          >
            <p className="transition duration-200 ease-in-out group-hover:translate-x-1">
              Dupliquer
            </p>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
