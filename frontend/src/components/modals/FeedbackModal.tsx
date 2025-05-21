import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Textarea,
} from "@heroui/react";
import IntensityComponent from "../IntensityComponent";
import { useState } from "react";
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
import ConfirmButton from "../ConfirmButton";
import Cancel from "../Cancel";
import HeartRating from "../HeartRating";

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
    event ? event.intensity : 7
  );
  const [feeling, setFeeling] = useState<number>(event?.feeling ?? 5);
  const [satisfaction, setSatisfaction] = useState<number>(
    event?.satisfaction ?? 7
  );
  const [comment, setComment] = useState<string>(event?.comment ?? "");
  const data = {
    trainingId: trainingId as string,
    comment,
    intensity,
    feeling,
    satisfaction,
  };

  const switchView = () => {
    if (setIsShow) setIsShow(false);
  };

  const handleFeedback = async () => {
    if (event && !currentStudent && setIsShow) {
      await updateFeedback({
        variables: {
          data,
          id: event.id,
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

  const handleDeleteFeedback = async (id: string) => {
    await deleteFeedback({
      variables: {
        id,
      },
    });
    refetch.refetchMyFeedbacks();
    refetch.refetchMyTraining();
    setOpen(false);
  };
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={() => {
        if (setIsShow) setIsShow(true);
        setOpen(false);
      }}
      size="full"
      placement="bottom"
      classNames={{
        base: "w-1/2 2xl:w-1/3 h-full mx-auto left-1/4 2xl:left-1/3",
      }}
      motionProps={{
        initial: { y: "100%", opacity: 0 },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 300,
            bounce: 0.25,
            duration: 0.3,
          },
        },
        exit: {
          y: "100%",
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
      }}
    >
      <section className="w-full">
        <DrawerContent>
          <DrawerHeader className="w-full flex flex-col items-center justify-center gap-2">
            <p className="text-2xl">
              COMMENT S'EST DEROULE{" "}
              <span className="text-tertiary font-bold">TA SEANCE ?</span>
            </p>
            <p>Renseigne ton feedback pour suivre ton évolution !</p>
          </DrawerHeader>
          <DrawerBody className="w-full h-full flex flex-col items-center justify-between">
            <section className="w-full">
              <section className="flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg bg-white">
                <p className="w-full text-center text-lg font-bold">
                  Perception de l'effort
                </p>
                <IntensityComponent
                  value={event && isShow ? event?.intensity : intensity}
                  setValue={setIntensity}
                  disabled={isShow}
                />
              </section>
              <section className="flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg bg-white">
                <p className="w-full text-center text-lg font-bold">
                  Sensation
                </p>
                <EmojiFeeling
                  value={event && isShow ? event?.feeling : feeling}
                  setValue={setFeeling}
                  disabled={isShow}
                />
              </section>
              <section className="flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg bg-white">
                <p className="w-full text-center text-lg font-bold">
                  Satisfaction / Plaisir
                </p>
                <HeartRating
                  satisfaction={satisfaction}
                  setSatisfaction={setSatisfaction}
                  disabled={isShow}
                />
              </section>
              <section className="flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg bg-white">
                <p className="w-full items-start font-bold">Commentaires</p>
                <Textarea
                  value={isShow ? event?.comment ?? "" : comment}
                  isReadOnly={isShow}
                  onChange={(e) => setComment(e.target.value)}
                  label="Vos commentaires sur la séance"
                />
              </section>
            </section>
            <div className="w-full flex justify-end items-center gap-2 pb-2">
              {!currentStudent && isShow && <Edit onClick={switchView} />}
              {!currentStudent && isShow && (
                <Delete
                  onClick={handleDeleteFeedback}
                  id={event?.id as string}
                  title="Êtes vous sûr de vouloir supprimer ce debrief ?"
                  loading={loadingDelete}
                />
              )}
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
          </DrawerBody>
        </DrawerContent>
      </section>
    </Drawer>
  );
}
