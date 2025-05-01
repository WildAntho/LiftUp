import { ExerciceModel } from "@/graphql/hooks";

type ChooseExerciceCardProps = {
  exercice: ExerciceModel;
};

export default function ChooseExerciceCard({
  exercice,
}: ChooseExerciceCardProps) {
  return (
    <>
      <div className="w-full h-[80%] flex justify-center items-center">
        <img
          src={`/exercices${exercice.image}`}
          alt="Image Exercice"
          className="h-full object-cover"
        />
      </div>
      <div className="w-full h-[20%] flex items-center justify-start bg-dark text-white p-4">
        <p className="text-sm">{exercice.title}</p>
      </div>
    </>
  );
}
