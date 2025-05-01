import { ExerciceModel, useGetAllExercicesModelQuery } from "@/graphql/hooks";
import ChooseExerciceCard from "./ChooseExerciceCard";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

type TabExercicesProps = {
  activeExercices: ExerciceModel[] | null;
  setActiveExercices: (exercice: ExerciceModel[] | null) => void;
};

export default function TabExercices({
  activeExercices,
  setActiveExercices,
}: TabExercicesProps) {
  const { data } = useGetAllExercicesModelQuery();
  const allExercices = data?.getAllExercicesModel ?? [];

  const handleClick = (e: ExerciceModel) => {
    if (activeExercices === null) {
      setActiveExercices([e]);
    } else {
      const exerciceIndex = activeExercices.findIndex((ex) => ex.id === e.id);
      if (exerciceIndex === -1) {
        setActiveExercices([...activeExercices, e]);
      } else {
        setActiveExercices(
          activeExercices.filter((_, index) => index !== exerciceIndex)
        );
      }
    }
  };

  return (
    <section className="flex flex-wrap justify-center w-full gap-4">
      {allExercices.map((e) => {
        const isActive = activeExercices?.find(
          (exercice) => exercice.id === e.id
        );
        return (
          <section
            key={e.id}
            className="relative w-[200px] h-[200px] overflow-hidden flex flex-col items-center justify-center shadow-md rounded-2xl border border-gray-300 cursor-pointer hover:border-gray-600"
            onClick={() => handleClick(e)}
          >
            <ChooseExerciceCard exercice={e as ExerciceModel} />
            {isActive && (
              <div className="w-full h-full flex justify-center items-center absolute top-0 bg-green-400/20 rounded-2xl">
                <motion.div
                  className="w-10 h-10 flex justify-center items-center rounded-full bg-green-400"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5,
                  }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white flex justify-center items-center rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
                      <Check className="text-tertiary font-semibold w-3 h-3" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}
