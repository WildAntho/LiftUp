import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "evergreen-ui";
import IntensityComponent from "../IntensityComponent";
import { ChangeEvent, useState } from "react";
import EmojiFeeling from "../EmojieFeeling";
import {
  Feedback,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
} from "@/graphql/hooks";
import { Loader2 } from "lucide-react";
import Edit from "../Edit";
import Delete from "../Delete";
import { useStudentStore } from "@/services/zustand/studentStore";

type FeedbackModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  trainingId?: string;
  isShow?: boolean;
  setIsShow?: (value: boolean) => void;
  event?: Feedback;
  closeTrainingModal?: () => void;
  refetch: {
    refetchMyTraining: () => void;
    refetchStudentTraining: () => void;
    refetchMyFeedbacks: () => void;
    refetchStudentFeedbacks: () => void;
  };
};

export default function FeedbackModal({
  isOpen,
  setOpen,
  trainingId,
  isShow = false,
  setIsShow,
  event,
  closeTrainingModal,
  refetch,
}: FeedbackModalProps) {
  const currentStudent = useStudentStore((state) => state.student);
  const [addFeedback, { loading: loadingAddFeedback }] =
    useAddFeedbackMutation();
  const [deleteFeedback, { loading: loadingDelete }] =
    useDeleteFeedbackMutation();
  const [updateFeedback, { loading: loadingUpdateFeedback }] =
    useUpdateFeedbackMutation();
  const [intensity, setIntensity] = useState<number>(
    event ? event.intensity : 1
  );
  const [feeling, setFeeling] = useState<number>(event?.feeling ?? 1);
  const [comment, setComment] = useState<string>(event?.comment ?? "");
  const data = {
    trainingId: trainingId as string,
    comment,
    intensity,
    feeling,
  };

  const switchView = () => {
    if (setIsShow) setIsShow(false);
  };

  const handleFeedback = async () => {
    if (event && !currentStudent && setIsShow) {
      await updateFeedback({
        variables: {
          data,
          id: event?.id,
        },
      });
      setIsShow(true);
    } else {
      await addFeedback({
        variables: {
          data,
        },
      });
    }
    if (closeTrainingModal && refetch) {
      refetch.refetchMyTraining();
      closeTrainingModal();
    }
    refetch.refetchMyFeedbacks();
    setOpen(false);
  };

  const handleDeleteFeedback = async () => {
    await deleteFeedback({
      variables: {
        id: event?.id as string,
      },
    });
    refetch.refetchMyFeedbacks();
    refetch.refetchMyTraining();
    setOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        if (setIsShow) setIsShow(true);
        setOpen(false);
      }}
      isDismissable={false}
      size="2xl"
      style={{ backgroundColor: "#F0F9F4" }}
      classNames={{
        closeButton: "text-black hover:bg-black/5 active:bg-black/10",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalHeader className="w-full flex justify-center">
          <p>Debrief</p>
        </ModalHeader>
        <ModalBody>
          <section className="flex flex-col justify-center items-center gap-4 w-full p-4 rounded-lg bg-white">
            <p className="w-full items-start font-bold">
              Perception de l'effort
            </p>
            <IntensityComponent
              value={event && isShow ? event?.intensity : intensity}
              setValue={setIntensity}
              disabled={isShow}
            />
          </section>
          <section className="flex flex-col justify-center items-center gap-4 w-full p-4 rounded-lg bg-white">
            <p className="w-full items-start font-bold">Sensation</p>
            <EmojiFeeling
              value={event && isShow ? event?.feeling : feeling}
              setValue={setFeeling}
              disabled={isShow}
            />
          </section>
          <section className="flex flex-col justify-center items-center gap-4 w-full p-4 rounded-lg bg-white">
            <p className="w-full items-start font-bold">Commentaires</p>
            {!isShow ? (
              <>
                <Textarea
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setComment(e.target.value)
                  }
                  placeholder="Renseignez vos commentaires sur la séance"
                />
              </>
            ) : (
              <p className="w-full items-start p-5 text-sm">{event?.comment}</p>
            )}
          </section>
        </ModalBody>
        <ModalFooter className="items-center">
          {!currentStudent && isShow && <Edit onClick={switchView} />}
          {!currentStudent && isShow && (
            <Delete
              onDelete={handleDeleteFeedback}
              loading={loadingDelete}
              description="Souhaitez-vous vraiment supprimer ce debrief ?"
              title="Suppresion d'un debrief"
            />
          )}
          {((isShow && event) || (!isShow && !event)) && (
            <Button
              color="danger"
              variant="outline"
              onClick={() => {
                setOpen(false);
                if (setIsShow) setIsShow(true);
              }}
            >
              Fermer
            </Button>
          )}
          {!isShow && event && (
            <Button
              color="danger"
              variant="outline"
              onClick={() => {
                if (setIsShow) setIsShow(true);
              }}
            >
              Annuler
            </Button>
          )}
          {!isShow && (
            <Button
              type="submit"
              className="bg-primary hover:bg-blue-600 transition duration-150"
              onClick={handleFeedback}
              disabled={loadingAddFeedback || loadingUpdateFeedback}
            >
              {loadingAddFeedback ||
                (loadingUpdateFeedback && <Loader2 className="animate-spin" />)}
              Valider le debrief
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
