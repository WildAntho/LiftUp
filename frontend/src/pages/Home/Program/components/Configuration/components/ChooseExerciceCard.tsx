import { ExerciceModel } from "@/graphql/hooks";
import { exercicesURL } from "@/services/utils";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ChooseExerciceCardProps = {
  exercice: ExerciceModel;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ChooseExerciceCard({
  exercice,
  isFavorite,
  onFavorite,
  onDelete,
}: ChooseExerciceCardProps) {
  const [currentIsFavorite, setCurrentIsFavorite] = useState(isFavorite);

  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (currentIsFavorite) onDelete(exercice.id);
    if (!currentIsFavorite) onFavorite(exercice.id);
    setCurrentIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    setCurrentIsFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleChange}
        className="absolute top-2 right-2 z-10 cursor-pointer p-1 shadow-sm border-1 border-gray-200 bg-gray-50 rounded-lg"
      >
        <Heart
          size={20}
          fill={currentIsFavorite ? "#ef4444" : "none"}
          className={`transition-colors duration-300 ${
            currentIsFavorite ? "text-red-500" : "text-gray-500"
          }`}
        />
      </motion.div>
      <div className="w-full h-[75%] flex justify-center items-center">
        <img
          src={`${exercicesURL}${exercice.image}`}
          alt="Image Exercice"
          className="h-full object-cover"
        />
      </div>
      <div className="w-full h-[25%] flex items-center bg-dark/80 text-white border-t-1 px-5">
        <p className="text-xs leading-snug text-left line-clamp-2">
          {exercice.title}
        </p>
      </div>
    </div>
  );
}
