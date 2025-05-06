import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { CircleCheck, Info, TriangleAlert } from "lucide-react";
import { ReactElement } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  additionalContent?: ReactElement;
  type?: "success" | "delete" | "info";
};

export default function ConfirmModal({
  isOpen,
  onClose,
  description,
  onConfirm,
  loading,
  title = "Suppression",
  additionalContent,
  type = "delete",
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CircleCheck className="h-6 w-6 text-green-500" />;
      case "info":
        return <Info className="h-6 w-6 text-orange-500" />;
      case "delete":
      default:
        return <TriangleAlert className="h-6 w-6 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "info":
        return "bg-orange-50";
      case "delete":
      default:
        return "bg-red-50";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-orange-500";
      case "delete":
      default:
        return "bg-red-500";
    }
  };

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
        <ModalBody>
          <section className="flex justify-start items-center gap-4 pt-6 pl-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${getBgColor()}`}
            >
              {getIcon()}
            </div>
            <p className="text-2xl font-semibold text-gray-900">{title}</p>
          </section>
          <p className="text-sm text-gray-500 ml-14 pl-2">{description}</p>
          <p className="ml-14 pl-2 my-2 text-sm">{additionalContent}</p>
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
            className={`group ${getButtonColor()} text-white font-semibold`}
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
