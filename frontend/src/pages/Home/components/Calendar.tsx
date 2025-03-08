import { Key, useEffect, useState } from "react";
import { getDaysInMonth, getDaysInWeek } from "../../../services/utils";
import { ScheduleCalendar } from "./ScheduleCalendar";
import { ViewMode } from "@/type";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import {
  useGetCrewTrainingLazyQuery,
  useGetFeedbacksQuery,
  useGetMyTrainingQuery,
  useGetStudentFeedbackLazyQuery,
  useGetStudentTrainingsLazyQuery,
} from "@/graphql/hooks";
import { AlarmClockCheck, BookOpenCheck, CheckCheck } from "lucide-react";
import { useStudentStore } from "@/services/zustand/studentStore";
import BadgeStudent from "./BadgeStudent";
import { Tab, Tabs } from "@heroui/tabs";
import { Progress } from "@heroui/react";
import { subDays } from "date-fns";
import { useCrewStore } from "@/services/zustand/crewStore";
import BadgeCrew from "./BadgeCrew";

type CalendarProps = {
  currentUser: UserWithoutPassword | null;
};

export default function Calendar({ currentUser }: CalendarProps) {
  const currentStudent = useStudentStore((state) => state.student);
  const currentCrew = useCrewStore((state) => state.crew);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const days =
    viewMode === "month"
      ? getDaysInMonth(currentDate)
      : getDaysInWeek(currentDate);
  const startDate = subDays(days[0], 1);
  const endDate = days.at(-1);
  const rangeDate = {
    startDate,
    endDate,
  };

  // Get personal trainings
  const {
    data: dataMyTrainings,
    loading: loadingMyTraining,
    refetch: refetchMyTraining,
  } = useGetMyTrainingQuery({
    variables: {
      id: currentUser?.id.toString() as string,
      rangeDate,
    },
  });
  // Get one student trainings
  const [
    getStudentTraining,
    {
      data: dataStudentTrainings,
      loading: loadingStudentTrainings,
      refetch: refetchStudentTraining,
    },
  ] = useGetStudentTrainingsLazyQuery();
  // Get personal feedbacks
  const {
    data: dataFeedbacks,
    loading: loadingFeedbacks,
    refetch: refetchMyFeedbacks,
  } = useGetFeedbacksQuery({
    variables: {
      id: currentUser?.id.toString() as string,
      rangeDate,
    },
  });
  // Get one student feedbacks
  const [
    getStudentFeedbacks,
    {
      data: dataStudentFeedbacks,
      loading: loadingStudentFeedbacks,
      refetch: refetchStudentFeedbacks,
    },
  ] = useGetStudentFeedbackLazyQuery();
  const [
    getCrewTrainings,
    {
      data: dataCrewTraining,
      loading: loadingCrewTraining,
      refetch: refetchCrewTraining,
    },
  ] = useGetCrewTrainingLazyQuery();

  const myTrainings = dataMyTrainings ? dataMyTrainings.getTrainingsById : [];
  const studentTrainings = dataStudentTrainings
    ? dataStudentTrainings.getStudentTrainings
    : [];
  const myFeedbacks = dataFeedbacks ? dataFeedbacks.getFeedbacks : [];
  const studentFeedbacks = dataStudentFeedbacks
    ? dataStudentFeedbacks.getStudentFeedback
    : [];
  const crewTrainings = dataCrewTraining?.getCrewTraining ?? [];

  useEffect(() => {
    if (currentCrew && currentCrew.id) {
      getCrewTrainings({
        variables: {
          id: currentCrew.id.toString() as string,
          rangeDate,
        },
        fetchPolicy: "cache-and-network",
      });
    }
    if (currentStudent && currentStudent.id) {
      getStudentTraining({
        variables: {
          id: currentStudent.id.toString() as string,
          rangeDate,
        },
        fetchPolicy: "cache-and-network",
      });
      getStudentFeedbacks({
        variables: {
          id: currentStudent.id.toString() as string,
          rangeDate,
        },
        fetchPolicy: "cache-and-network",
      });
    } else {
      refetchMyTraining();
      refetchMyFeedbacks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent, currentCrew, currentDate]);

  const refetch = {
    refetchMyTraining,
    refetchStudentTraining,
    refetchMyFeedbacks,
    refetchStudentFeedbacks,
    refetchCrewTraining,
  };

  // Navigation options
  const options = [
    {
      id: "plan",
      label: (
        <div className="flex items-center space-x-2">
          <AlarmClockCheck size={18} />
          <span>Prévu</span>
        </div>
      ),
    },
    {
      id: "done",
      label: (
        <div className="flex items-center space-x-2">
          <CheckCheck size={18} />
          <span>Réalisé</span>
        </div>
      ),
    },
    {
      id: "both",
      label: (
        <div className="flex items-center space-x-2">
          <BookOpenCheck size={18} />
          <span>Les Deux</span>
        </div>
      ),
    },
  ];

  // Active options
  const [active, setActive] = useState<string>("plan");
  const handleSelectionChange = (key: Key) => {
    if (!currentCrew) setActive(key as string);
  };

  return (
    <section className=" relative w-full h-full flex flex-col justify-center items-center bg-white rounded-2xl p-8 gap-5">
      {currentStudent && <BadgeStudent student={currentStudent} />}
      {currentCrew && <BadgeCrew crew={currentCrew} />}
      <Tabs
        aria-label="Options"
        color="primary"
        size="md"
        variant="bordered"
        selectedKey={active}
        onSelectionChange={handleSelectionChange}
      >
        {options.map((s) => (
          <Tab key={s.id} title={s.label} />
        ))}
      </Tabs>
      {!loadingMyTraining &&
      !loadingStudentTrainings &&
      !loadingFeedbacks &&
      !loadingStudentFeedbacks &&
      !loadingCrewTraining ? (
        <section className="relative w-full h-[93%]">
          <section className="w-full h-full flex justify-center items-center overflow-y-scroll">
            {active === "plan" && (
              <ScheduleCalendar
                days={days}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                events={
                  !currentStudent
                    ? currentCrew
                      ? crewTrainings
                      : myTrainings
                    : studentTrainings
                }
                viewMode={viewMode}
                setViewMode={setViewMode}
                refetch={refetch}
                type="plan"
              />
            )}
            {active === "done" && (
              <ScheduleCalendar
                days={days}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                events={!currentStudent ? myFeedbacks : studentFeedbacks}
                viewMode={viewMode}
                setViewMode={setViewMode}
                refetch={refetch}
                type="done"
              />
            )}
            {active === "both" && (
              <div className="flex justify-center items-center w-full h-full">
                <div className="w-full h-full">
                  <ScheduleCalendar
                    days={days}
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    events={
                      !currentStudent
                        ? currentCrew
                          ? crewTrainings
                          : myTrainings
                        : studentTrainings
                    }
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    refetch={refetch}
                    type="plan"
                  />
                </div>
                <div className="absolute top-0 border-l-2 border-gray-300 w-auto h-full" />
                <div className="w-full h-full">
                  <ScheduleCalendar
                    days={days}
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    events={!currentStudent ? myFeedbacks : studentFeedbacks}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    refetch={refetch}
                    type="done"
                  />
                </div>
              </div>
            )}
          </section>
        </section>
      ) : (
        <section className="w-full h-[93%] flex justify-center items-center">
          <Progress
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
            size="sm"
          />
        </section>
      )}
    </section>
  );
}
