import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
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
import Edit from "../Edit";
import Delete from "../Delete";
import { useStudentStore } from "@/services/zustand/studentStore";
import ConfirmModal from "./ConfirmModal";
import ConfirmButton from "../ConfirmButton";
import Cancel from "../Cancel";

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
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
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
        <ModalFooter>
          {!currentStudent && isShow && <Edit onClick={switchView} />}
          {!currentStudent && isShow && (
            <Delete onClick={() => setOpenConfirm(true)} />
          )}
          <div className="w-[1000px] flex justify-end items-center gap-2">
            {((isShow && event) || (!isShow && !event)) && (
              <Cancel
                onClick={() => {
                  setOpen(false);
                  if (setIsShow) setIsShow(true);
                }}
                title="Fermer"
              />
            )}
            {!isShow && event && (
              <Cancel
                onClick={() => {
                  if (setIsShow) setIsShow(true);
                }}
                title="Annuler"
              />
            )}
            {!isShow && (
              <ConfirmButton
                onClick={handleFeedback}
                title="Valider le debrief"
                loading={loadingAddFeedback || loadingUpdateFeedback}
              />
            )}
          </div>
        </ModalFooter>
      </ModalContent>
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        description="Êtes-vous sûr de vouloir supprimer ce debrief ?"
        onConfirm={handleDeleteFeedback}
        loading={loadingDelete}
      />
    </Modal>
  );
}
