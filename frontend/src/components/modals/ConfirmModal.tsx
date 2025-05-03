import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { TriangleAlert } from "lucide-react";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
  loading?: boolean;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  description,
  onConfirm,
  loading,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      size="lg"
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
      }}
    >
      <ModalContent>
        <ModalBody>
          <section className="flex justify-start items-center gap-4 pt-6 pl-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <TriangleAlert className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">Suppression</p>
          </section>
          <p className="text-sm text-gray-500 ml-14 pl-2">{description}</p>
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
            className="group bg-red-500 text-white font-semibold"
            isLoading={loading}
            radius="sm"
            onPress={() => {
              onConfirm();
              onClose();
            }}
          >
            <p className="transition duration-200 ease-in-out group-hover:translate-x-1">
              Oui, je suis sûr(e)
            </p>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
