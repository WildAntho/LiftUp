import TrainingModal from "@/components/modals/TrainingModal";
import { Training } from "@/graphql/hooks";
import { useDraggable } from "@dnd-kit/core";
import { Dumbbell } from "lucide-react";
import { useState } from "react";

type TrainingCardProps = {
  event: Training;
  setAllowPropagation: (value: boolean) => void;
  refetch: {
    refetchMyTraining: () => void;
    refetchStudentTraining: () => void;
    refetchMyFeedbacks: () => void;
    refetchStudentFeedbacks: () => void;
    refetchCrewTraining: () => void;
  };
};

export default function TrainingCard({
  event,
  setAllowPropagation,
  refetch,
}: TrainingCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAllowPropagation(true);
    setOpen(true);
  };
  const handleClose = () => {
    setAllowPropagation(false);
    setOpen(false);
  };
  const [open, setOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
    data: event,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <>
      <div
        className="w-full h-full shadow-md bg-blue-100 text-dark rounded px-2 py-1 truncate line-clamp-1 flex-1 cursor-grab active:cursor-grabbing"
        onClick={handleClick}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <p className="text-xs font-semibold">{event.title}</p>
        <div className="flex justify-start items-center gap-2 text-xs">
          <Dumbbell size={12} />
          {event.exercices && (
            <p>
              {event?.exercices?.length}{" "}
              {`exercice${event?.exercices?.length > 1 ? "s" : ""}`}
            </p>
          )}
        </div>
      </div>
      <TrainingModal
        open={open}
        close={handleClose}
        training={event as Training}
        date={event.date}
        refetch={refetch}
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </>
  );
}
