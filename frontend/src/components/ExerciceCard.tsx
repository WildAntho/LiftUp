import {
  CheckCircle,
  BarChart2,
  Layers,
  Activity,
  ChevronRight,
  AlarmClockCheck,
} from "lucide-react";
import { Exercice, RepFormat, WeightFormat } from "@/graphql/hooks";
import { Input } from "@heroui/react";
import { useState } from "react";
import { useExerciceURL } from "@/services/zustand/useExerciceUrl";

type ExerciceCardProps = {
  exercice: Exercice;
};

export default function ExerciceCard({ exercice }: ExerciceCardProps) {
  const exercicesURL = useExerciceURL();
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  const [showAll, setShowAll] = useState(false);

  const renderWeight = () => {
    switch (exercice.weightFormat) {
      case WeightFormat.Bodyweight:
        return <p>-</p>;
      case WeightFormat.Kg:
        return <p>{exercice.weight}kg</p>;
      case WeightFormat.Lbs:
        return <p>{exercice.weight}lbs</p>;
      case WeightFormat.Percentage:
        return <p>{exercice.weight}%</p>;
      case WeightFormat.Choice:
        return <p>-</p>;
    }
  };

  const renderWeightFormat = () => {
    switch (exercice.weightFormat) {
      case WeightFormat.Bodyweight:
        return <p>Poids du corps</p>;
      case WeightFormat.Kg:
        return <p>Poids(kg)</p>;
      case WeightFormat.Lbs:
        return <p>Poids(lbs)</p>;
      case WeightFormat.Percentage:
        return <p>%RM</p>;
      case WeightFormat.Choice:
        return <p>Au choix</p>;
    }
  };

  const renderRepFormat = () => {
    switch (exercice.repFormat) {
      case RepFormat.Amrap:
        return <p>AMRAP</p>;
      case RepFormat.Emom:
        return <p>EMOM</p>;
      case RepFormat.E2Mom:
        return <p>E2MOM</p>;
      case RepFormat.Standard:
        return <p>Standard</p>;
      case RepFormat.Time:
        return <p>Temps(sec)</p>;
    }
  };
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-4 cursor-pointer rounded-2xl bg-white border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1">
      <section
        className="flex justify-between items-center w-full"
        onClick={toggleShowAll}
      >
        <div className="flex justify-start items-center gap-3">
          <img
            src={`${exercicesURL}${exercice.image}`}
            alt="Image Exercice"
            className="w-16 h-16 object-cover object-top rounded-md"
          />
          <div className="flex flex-col justify-center items-start gap-1">
            <p className="text-md font-semibold text-gray-800">
              {exercice.title}
            </p>
            <p className="text-xs text-gray-500">
              {exercice.serie} {`série${exercice.serie > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <div className="flex justify-content items-center gap-3">
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
        <section className="grid grid-cols-5 gap-2 w-full mt-3">
          <div className="flex flex-col items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <CheckCircle size={20} className="text-indigo-500" />
            <p className="text-xs font-medium text-gray-600">Série</p>
            <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
              {exercice.serie}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-col items-center justify-start gap-2 h-[70%] w-full p-2 bg-gray-50 rounded-lg border border-gray-200">
              <BarChart2 size={20} className="text-teal-500" />
              <p className="text-xs font-medium text-gray-600">Répétitions</p>
              <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
                {exercice.rep}
              </div>
            </div>
            <div className="flex justify-center items-center h-[30%] w-full p-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
              {renderRepFormat()}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-col items-center justify-start gap-2 h-[70%] w-full p-2 bg-gray-50 rounded-lg border border-gray-200">
              <Layers size={20} className="text-yellow-500" />
              <p className="text-xs font-medium text-gray-600">Charge</p>
              <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
                {renderWeight()}
              </div>
            </div>
            <div className="flex justify-center items-center h-[30%] w-full p-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
              {renderWeightFormat()}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-col items-center justify-start gap-2 h-[70%] w-full p-2 bg-gray-50 rounded-lg border border-gray-200">
              <Activity size={20} className="text-red-500" />
              <p className="text-xs font-medium text-gray-600">Intensité</p>
              <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
                {exercice.intensity}
              </div>
            </div>
            <div className="flex justify-center items-center h-[30%] w-full p-2 bg-gray-50 rounded-lg border border-gray-200 text-sm">
              {exercice.intensityFormat}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <AlarmClockCheck size={20} className="text-yellow-500" />
            <p className="text-xs font-medium text-gray-600">Tempo</p>
            <div className="w-full h-[40px] flex justify-center items-center text-md font-bold text-gray-800">
              <p>{exercice.tempo ? exercice.tempo : "Aucun tempo"}</p>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center mt-4 w-full">
          <Input label="Notes" value={exercice.notes ?? ""} isReadOnly />
        </section>
      </section>
    </section>
  );
}
