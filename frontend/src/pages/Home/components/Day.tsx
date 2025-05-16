import { useState } from "react";
import TrainingCard from "./TrainingCard";
import { CalendarEvent } from "@/type";
import FeedbackCard from "./FeedbackCard";
import TrainingModal from "@/components/modals/TrainingModal";
import { isToday } from "date-fns";
import { useDroppable } from "@dnd-kit/core";
import { Feedback, Training } from "@/graphql/hooks";

type DayProps<T> = {
  date: Date;
  events: T[];
  refetch: {
    refetchMyTraining: () => void;
    refetchStudentTraining: () => void;
    refetchMyFeedbacks: () => void;
    refetchStudentFeedbacks: () => void;
    refetchCrewTraining: () => void;
  };
  type: string;
  index: number;
};

export function Day<T extends CalendarEvent>({
  date,
  events,
  refetch,
  type,
  index,
}: DayProps<T>) {
  const dayNumber = date.getDate();
  const isCurrentMonth = date.getMonth() === new Date().getMonth();
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => {
    setOpen(false);
  };
  const [allowPropagation, setAllowPropagation] = useState<boolean>(false);
  const { setNodeRef } = useDroppable({
    id: date as Training["date"],
  });

  const handleDayClick = () => {
    if (type === "plan" && !allowPropagation) {
      setOpen(true);
    }
  };

  return (
    <>
      <TrainingModal
        open={open}
        close={closeModal}
        date={date}
        refetch={refetch}
        isNew={true}
      />
      <div
        data-testid={index === 0 ? "day-training" : ""}
        ref={setNodeRef}
        onClick={handleDayClick}
        className="flex flex-col min-h-[150px] p-2 border border-gray-200 bg-white cursor-pointer transition-colors hover:bg-gray-50 group"
      >
        <div className="flex justify-between items-center max-h-[20%]">
          <span
            className={`text-sm font-medium ${
              !isCurrentMonth && "text-gray-300"
            } ${
              isToday(date) &&
              "flex justify-center items-center bg-primary text-white rounded-full w-8 h-8"
            }`}
          >
            {dayNumber}
          </span>
        </div>
        <div className="relative mt-2 flex flex-col justify-start flex-1 gap-1">
          {events.map((event) => {
            if (type === "plan")
              return (
                <TrainingCard
                  key={event.id}
                  refetch={refetch}
                  event={event as Training}
                  setAllowPropagation={setAllowPropagation}
                />
              );
            if (type === "done")
              return (
                <FeedbackCard
                  key={event.id}
                  refetch={refetch}
                  event={event as Feedback}
                  setAllowPropagation={setAllowPropagation}
                />
              );
          })}
        </div>
      </div>
    </>
  );
}
