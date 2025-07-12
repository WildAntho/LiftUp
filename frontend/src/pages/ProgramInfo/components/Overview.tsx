import { Separator } from "@/components/ui/separator";
import { Program, ProgramLevel } from "@/graphql/hooks";
import { FaCircleInfo } from "react-icons/fa6";

type OverviewProps = {
  program: Program;
  trainingCount?: number;
};

export default function Overview({ program, trainingCount }: OverviewProps) {
  const renderLevel = (level: ProgramLevel) => {
    switch (level) {
      case ProgramLevel.Advanced:
        return "Avancé";
      case ProgramLevel.Intermediate:
        return "Intermédiaire";
      case ProgramLevel.Beginner:
        return "Débutant";
    }
  };
  return (
    <section className="flex flex-col items-start justify-start gap-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <FaCircleInfo size={22} />
          Informations générales
        </p>
        <Separator />
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="h-[75px] flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl">
          <p className="text-xl font-bold">{program?.duration}</p>
          <p className="text-xs">Semaines</p>
        </div>
        <div className="h-[75px] flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl">
          <p className="text-xl font-bold">{trainingCount}</p>
          <p className="text-xs">Entraînements</p>
        </div>
        <div className="h-[75px] flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl">
          <p className="text-md font-semibold">{program?.category?.label}</p>
        </div>
        <div className="h-[75px] flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl">
          <p className="text-md font-semibold">{renderLevel(program?.level)}</p>
        </div>
      </div>
    </section>
  );
}
