import { ExerciceModel } from "@/graphql/hooks";
import { exercicesURL } from "@/services/utils";

type ChooseExerciceCardProps = {
  exercice: ExerciceModel;
};

export default function ChooseExerciceCard({
  exercice,
}: ChooseExerciceCardProps) {
  return (
    <>
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
    </>
  );
}
