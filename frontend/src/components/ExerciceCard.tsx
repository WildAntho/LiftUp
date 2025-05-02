import {
  Info,
  CheckCircle,
  BarChart2,
  Layers,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Maybe } from "@/graphql/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useState } from "react";

type ExerciceCardProps = {
  id: string;
  title: string;
  serie: number;
  rep: number;
  weight?: Maybe<number>;
  intensity?: Maybe<number>;
  notes?: string | null;
  image?: string | null;
};

export default function ExerciceCard({
  title,
  serie,
  rep,
  weight,
  intensity,
  image,
  notes,
}: ExerciceCardProps) {
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  const [showAll, setShowAll] = useState(false);
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-4 cursor-pointer rounded-2xl bg-white border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1">
      <section
        className="flex justify-between items-center w-full"
        onClick={toggleShowAll}
      >
        <div className="flex justify-start items-center gap-3">
          <img
            src={`/exercices${image}`}
            alt="Image Exercice"
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex flex-col justify-center items-start gap-1">
            <p className="text-md font-semibold text-gray-800">{title}</p>
            <p className="text-xs text-gray-500">
              {serie} {`série${serie > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <div className="flex justify-content items-center gap-3">
          {notes && (
            <Popover placement="left" showArrow={true}>
              <PopoverTrigger>
                <Info className="size-6 text-gray-400 hover:text-gray-700 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="max-w-[250px] p-4 bg-gray-100 rounded-md shadow-lg">
                <p className="text-xs text-gray-600">
                  {notes || "Aucune note ajoutée"}
                </p>
              </PopoverContent>
            </Popover>
          )}
          <ChevronRight
            size={20}
            className={`text-gray-500 transition-all duration-200 ease-in-out ${
              showAll ? "rotate-90" : ""
            }`}
          />
        </div>
      </section>
      <section
        className={`flex flex-col justify-center items-center w-full mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
          showAll ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <section className="grid grid-cols-3 gap-4 w-full mt-3">
          <div className="flex flex-col items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <CheckCircle size={20} className="text-indigo-500" />
            <p className="text-xs font-medium text-gray-600">Série</p>
            <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
              {serie}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <BarChart2 size={20} className="text-teal-500" />
            <p className="text-xs font-medium text-gray-600">Répétitions</p>
            <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
              {rep}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <Layers size={20} className="text-yellow-500" />
            <p className="text-xs font-medium text-gray-600">Charge</p>
            <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
              <p>{weight ? weight + "kg" : "Au choix"}</p>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center mt-4 w-full">
          <div className="flex flex-col items-center w-full max-w-[900px] gap-2 py-2 px-3 bg-gray-50 rounded-lg border border-gray-200">
            <Activity size={20} className="text-red-500" />
            <p className="text-xs font-medium text-gray-600">RPE</p>
            {intensity ? (
              <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
                {intensity}
              </div>
            ) : (
              <p className="text-xs">Aucune intensité renseignée</p>
            )}
          </div>
        </section>
      </section>
    </section>
  );
}
