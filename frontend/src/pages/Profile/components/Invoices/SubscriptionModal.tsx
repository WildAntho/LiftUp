import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle } from "lucide-react";
import InvoiceButton from "./InvoiceButton";

type SubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  date?: Date;
};

export default function SubscriptionModal({
  isOpen,
  onClose,
  title,
  description,
  date,
}: SubscriptionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      size="lg"
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100 mb-2">
                <CheckCircle className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </ModalHeader>

            <ModalBody className="text-center">
              <p className="text-default-600">
                {description}{" "}
                {date && (
                  <span className="font-medium text-foreground">
                    {format(date, "d MMMM yyyy", { locale: fr })}
                  </span>
                )}
                .
              </p>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-2 mt-8">
              <InvoiceButton
                onClick={onClose}
                title="Compris, merci"
                color="blue"
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
