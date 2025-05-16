import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import { CalendarEvent, ViewMode } from "../../../type";
import { Day } from "./Day";
import {
  Calendar as CalendarIcon,
  CalendarSync,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Training, useUpdateTrainingMutation } from "@/graphql/hooks";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useStudentStore } from "@/services/zustand/studentStore";
import { useUserStore } from "@/services/zustand/userStore";
import { useCrewStore } from "@/services/zustand/crewStore";
import BadgeStudent from "./BadgeStudent";
import BadgeCrew from "./BadgeCrew";

interface CalendarProps<T> {
  events: T[];
  refetch: {
    refetchMyTraining: () => void;
    refetchStudentTraining: () => void;
    refetchMyFeedbacks: () => void;
    refetchStudentFeedbacks: () => void;
    refetchCrewTraining: () => void;
  };
  viewMode: "month" | "week";
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  type: string;
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
  days: Date[];
}

export const ScheduleCalendar = <T extends CalendarEvent>({
  events,
  viewMode,
  setViewMode,
  refetch,
  type,
  currentDate,
  setCurrentDate,
  days,
}: CalendarProps<T>) => {
  const currentStudent = useStudentStore((state) => state.student);
  const currentUser = useUserStore((state) => state.user);
  const currentCrew = useCrewStore((state) => state.crew);
  const isCoach = currentUser?.roles === "COACH";
  const [updateTraining] = useUpdateTrainingMutation();
  const monthDisplay = currentDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const moveMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + delta);
    } else {
      newDate.setDate(newDate.getDate() + delta * 7);
    }
    setCurrentDate(newDate);
  };

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  // State for UX on drag and drop function
  const [optimisticTraining, setOptimisticTraining] = useState<T[]>([]);

  // Set timeouf before dragging, allow click on the card
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  // Function trigger when the card is dropped
  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const eventId = active.id as Training["id"];
    const eventDate = active.data;
    const newDate = over.id as Training["date"];
    if (!eventDate.current?.editable && !isCoach) return;
    if (eventDate && !isSameDay(eventDate.current?.date, newDate)) {
      setOptimisticTraining((prev) => prev.filter((e: T) => e.id !== eventId));
      await updateTraining({
        variables: {
          data: {
            id: eventId,
            date: newDate,
          },
        },
      });
      if (currentStudent) refetch.refetchStudentTraining();
      if (currentCrew) refetch.refetchCrewTraining();
      if (!currentStudent) {
        refetch.refetchMyTraining();
        refetch.refetchMyFeedbacks();
      }
    }
  };

  useEffect(() => {
    setOptimisticTraining(events);
  }, [events]);

  return (
    <div className="bg-white p-2 w-full h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold ml-4">
            {monthDisplay[0].toUpperCase() + monthDisplay.slice(1)}
          </h2>
          <button
            onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
            className="flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <CalendarIcon size={16} />
            {viewMode === "month" ? "Vue Semaine" : "Vue Mois"}
          </button>
          <Tooltip
            content="Revenir à aujourd'hui"
            showArrow={true}
            className="text-xs"
            color="foreground"
          >
            <div
              className="group hover:bg-black/5 p-2 rounded-full cursor-pointer"
              onClick={() => setCurrentDate(new Date())}
            >
              <CalendarSync
                size={24}
                className="text-gray-500 active:text-gray-500 group-hover:text-black"
              />
            </div>
          </Tooltip>
          {currentStudent && <BadgeStudent student={currentStudent} />}
          {currentCrew && <BadgeCrew crew={currentCrew} />}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => moveMonth(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => moveMonth(1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center py-2 font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {days.map((date, index) => {
            const dayEvents = optimisticTraining
              ? optimisticTraining.filter((event) => {
                  const dateEvent = new Date(event.date);
                  return dateEvent.toDateString() === date.toDateString();
                })
              : [];
            return (
              <Day
                key={index}
                date={date}
                events={dayEvents}
                refetch={refetch}
                type={type}
                index={index}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};
