import { useExerciceURL } from "@/services/zustand/useExerciceUrl";
import { Tooltip } from "@heroui/tooltip";
import ExerciceInfo from "./modals/ExerciceModelInfo";
import { useState } from "react";

type ExerciceImageProps = {
  image?: string;
  id?: string;
};

export default function ExerciceImage({ image, id }: ExerciceImageProps) {
  const exercicesURL = useExerciceURL(image ?? "");
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  return (
    <>
      <ExerciceInfo id={id} isOpen={openInfo} setOpen={setOpenInfo} />
      <Tooltip
        placement="bottom"
        content="Plus d'informations"
        showArrow={true}
        color="foreground"
        className="text-[8px]"
      >
        <div
          className="w-16 h-16 rounded-xl"
          onClick={(e) => {
            e.stopPropagation();
            setOpenInfo(true);
          }}
        >
          <img
            src={image ? `${exercicesURL}${image}` : "/noimage.webp"}
            alt="Image Exercice"
            className="w-full h-full hover:border hover:border-dark/50 object-cover object-top rounded-md"
          />
        </div>
      </Tooltip>
    </>
  );
}
