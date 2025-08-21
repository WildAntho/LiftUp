import { ExerciceModel } from "@/graphql/hooks";
import { Info } from "lucide-react";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import ExerciceInfo from "@/components/modals/ExerciceModelInfo";
import Delete from "@/components/Delete";
import Edit from "@/components/Edit";
import { useExerciceURL } from "@/services/hooks/useExerciceUrl";

type ChooseExerciceCardProps = {
  exercice: ExerciceModel;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onDeleteFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onInfo: (id: string) => void;
};

export default function ChooseExerciceCard({
  exercice,
  isFavorite,
  onFavorite,
  onDeleteFavorite,
  onDelete,
  onEdit,
  onInfo,
}: ChooseExerciceCardProps) {
  const [currentIsFavorite, setCurrentIsFavorite] = useState(isFavorite);
  const exercicesURL = useExerciceURL(exercice.image ?? "");
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (currentIsFavorite) onDeleteFavorite(exercice.id);
    if (!currentIsFavorite) onFavorite(exercice.id);
    setCurrentIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    setCurrentIsFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <div className="relative w-full h-full">
      <ExerciceInfo id={exercice.id} isOpen={openInfo} setOpen={setOpenInfo} />
      {exercice.user && (
        <div className="absolute left-2 top-2 flex items-center justify-center gap-2">
          <div className="bg-white rounded-xl">
            <Edit onClick={() => onEdit(exercice.id)} />
          </div>
          <div className="bg-white rounded-xl">
            <Delete
              onClick={onDelete}
              id={exercice.id}
              title="Êtes-vous sûr de vouloir supprimer cet exercice ?"
              additionalContent={
                <span className="text-red-600">
                  Attention ! La suppression de cet exercice supprimera la vidéo
                  associée et celle-ci ne sera plus accessible !
                </span>
              }
              loading={false}
            />
          </div>
        </div>
      )}
      <Tooltip
        placement="top"
        content={`${
          currentIsFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
        }`}
        showArrow={true}
        color="foreground"
        className="text-xs"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleChange}
          className="group absolute top-2 right-2 z-10 cursor-pointer p-1 shadow-sm border-1 border-gray-200 bg-gray-50 rounded-xl"
        >
          {currentIsFavorite ? (
            <RiHeartFill size={20} className="text-red-600 opacity-90" />
          ) : (
            <RiHeartAddLine
              size={20}
              className="group-hover:text-red-600 group-hover:opacity-70 text-gray-500"
            />
          )}
        </motion.div>
      </Tooltip>
      <div className="w-full h-[75%] flex justify-center items-center">
        <img
          src={
            exercice.image
              ? `${exercicesURL}${exercice.image}`
              : "/noimage.webp"
          }
          alt="Image Exercice"
          className={`h-full ${!exercice.image ? "w-full" : ""} object-cover`}
        />
      </div>
      <div className="w-full h-[25%] flex items-center justify-between bg-dark/80 text-white border-t-1 px-5">
        <p className="text-xs leading-snug text-left line-clamp-2 w-[75%]">
          {exercice.title}
        </p>
        <Tooltip
          placement="bottom"
          content="Plus d'informations"
          showArrow={true}
          color="foreground"
          className="text-xs"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onInfo(exercice.id);
            }}
          >
            <Info size={20} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
