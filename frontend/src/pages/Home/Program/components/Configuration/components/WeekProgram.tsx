import { useCallback, useEffect, useState } from "react";
import WorkoutButton from "./WorkoutButton";
import {
  Calendar,
  ChevronLeftIcon,
  ChevronRightIcon,
  Repeat2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { useProgramStore } from "@/services/zustand/programStore";
import { Tooltip } from "@heroui/tooltip";
import DuplicationModal from "@/components/modals/DuplicationModal";
import { toast } from "sonner";

type WeekProgramProps = {
  numberOfDays: number;
  activeDay: number;
  onDaySelect: (day: number) => void;
  allDayNumber: number[];
  onDuplicate: (currentWeek: number, repetition: number) => void;
  setIsChangingWeek: (value: boolean) => void;
};

type WorkoutDay = {
  number: number;
  isSelected: boolean;
};

export default function WeekProgram({
  numberOfDays,
  activeDay,
  onDaySelect,
  allDayNumber,
  onDuplicate,
  setIsChangingWeek,
}: WeekProgramProps) {
  const currentProgram = useProgramStore((state) => state.program);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [direction, setDirection] = useState(0);
  const DAYS_PER_WEEK = 7;
  const totalWeeks = Math.ceil(numberOfDays / DAYS_PER_WEEK);
  const [openDuplicate, setOpenDuplicate] = useState<boolean>(false);
  const [repetition, setRepetition] = useState<number>(1);

  // Exemple de données (à remplacer par vos vraies données)
  const generateWeekWorkouts = (): WorkoutDay[] => {
    const startDay = (currentWeek - 1) * DAYS_PER_WEEK;
    const remainingDays = numberOfDays - startDay;
    const daysToShow = Math.min(DAYS_PER_WEEK, remainingDays);

    return Array.from({ length: daysToShow }, (_, index) => {
      const dayNumber = startDay + index + 1;
      return {
        number: dayNumber,
        isSelected: allDayNumber.includes(dayNumber),
      };
    });
  };

  const handlePrevWeek = useCallback(() => {
    if (currentWeek > 1) {
      setIsChangingWeek(true);
      setDirection(-1);
      setCurrentWeek((prev) => prev - 1);
    }
  }, [currentWeek, setIsChangingWeek]);

  const handleNextWeek = useCallback(() => {
    if (currentWeek < totalWeeks) {
      setIsChangingWeek(true);
      setDirection(1);
      setCurrentWeek((prev) => prev + 1);
    }
  }, [currentWeek, totalWeeks, setIsChangingWeek]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      onDaySelect(currentWeek * 7 - 6);
      setIsChangingWeek(false);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [currentWeek, onDaySelect, setIsChangingWeek]);

  const workouts = generateWeekWorkouts();

  const hoverIconClass =
    "cursor-pointer border border-gray-50 transition-all duration-200 rounded-xl p-2 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-50 disabled:hover:translate-y-0 disabled:hover:shadow-none enabled:hover:bg-gray-50 enabled:hover:border-gray-200 enabled:hover:shadow-xs enabled:hover:translate-y-[-1px]";

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const handleDuplicateWeek = () => {
    if (repetition === 0) {
      toast.error("Vous devez dupliquer au moins une semaine");
      return;
    }
    onDuplicate(repetition, currentWeek);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <section className="flex flex-col gap-4 w-full">
        <section className="flex items-center w-full">
          <div className="flex items-center justify-start gap-2 w-1/3">
            <button
              className={hoverIconClass}
              onClick={handlePrevWeek}
              disabled={currentWeek === 1}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <div className="flex items-center rounded-lg gap-2 bg-gray-50 px-5 py-1 border border-gray-200">
              <Calendar className="w-5 h-5 text-gray-500" />
              <p data-testid="duration-test" className="text-gray-500 text-sm font-semibold">
                Semaine {currentWeek} / {totalWeeks}
              </p>
            </div>
            <button
              className={hoverIconClass}
              onClick={handleNextWeek}
              disabled={currentWeek === totalWeeks}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center w-1/3">
            <p
              data-testid="active-title-program"
              className="text-gray-700 text-xs font-semibold"
            >
              {currentProgram?.title}
            </p>
          </div>
          <div
            className="flex items-center justify-end w-1/3 mr-5"
            onClick={() => setOpenDuplicate(true)}
          >
            <Tooltip
              content="Dupliquer la semaine"
              showArrow={true}
              color="foreground"
              className="text-[10px]"
            >
              <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer">
                <Repeat2 className="size-5 text-black active:text-gray-500" />
              </div>
            </Tooltip>
          </div>
        </section>
        <Separator />
      </section>
      <div className="relative overflow-hidden py-2">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentWeek}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.15 },
            }}
            className="flex justify-center items-center w-full"
          >
            <section className="w-[90%] flex justify-center items-center gap-2">
              {workouts.map((workout) => (
                <WorkoutButton
                  key={workout.number}
                  number={workout.number}
                  isActive={activeDay === workout.number}
                  isSelected={workout.isSelected}
                  onClick={() => onDaySelect(workout.number)}
                />
              ))}
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
      <DuplicationModal
        isOpen={openDuplicate}
        onClose={() => setOpenDuplicate(false)}
        max={(currentProgram && currentProgram?.duration - currentWeek) ?? 1}
        count={repetition}
        setCount={setRepetition}
        onDuplicate={handleDuplicateWeek}
      />
    </div>
  );
}
