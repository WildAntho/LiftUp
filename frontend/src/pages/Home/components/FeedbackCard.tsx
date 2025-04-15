import FeedbackModal from "@/components/modals/FeedbackModal";
import { Feedback } from "@/graphql/hooks";
import { useState } from "react";

type FeedbackCardProps = {
  event: Feedback;
  setAllowPropagation: (value: boolean) => void;
  refetch: {
    refetchMyTraining: () => void;
    refetchStudentTraining: () => void;
    refetchMyFeedbacks: () => void;
    refetchStudentFeedbacks: () => void;
  };
};

export default function FeedbackCard({
  event,
  setAllowPropagation,
  refetch,
}: FeedbackCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);
  const handleClick = () => {
    setAllowPropagation(true);
    setOpen(true);
  };

  return (
    <>
      <div
        className="text-xs shadow-md bg-green-100 text-green-800 rounded px-2 py-1 truncate flex-1"
        onClick={handleClick}
      >
        {event.title}
      </div>
      <FeedbackModal
        isOpen={open}
        setOpen={setOpen}
        isShow={isShow}
        setIsShow={setIsShow}
        event={event}
        refetch={refetch}
      />
    </>
  );
}
