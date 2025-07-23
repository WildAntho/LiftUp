import { Periodicity } from "@/graphql/hooks";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";

type PeriodicitySelectorProps = {
  periodicity: Periodicity;
  setPeriodicity: (value: Periodicity) => void;
};

export default function PeriodicitySelector({
  periodicity,
  setPeriodicity,
}: PeriodicitySelectorProps) {
  return (
    <section className="h-full flex justify-center items-center bg-white rounded-xl">
      <div
        className={`flex justify-center items-center gap-4 border-1 p-4 rounded-l-xl hover:bg-gray-100 hover:border-dark cursor-pointer ${
          periodicity === Periodicity.Monthly
            ? "bg-gray-200 border-dark hover:bg-gray-200"
            : ""
        }`}
        onClick={() => setPeriodicity(Periodicity.Monthly)}
      >
        <FaRegCalendar size={20} />
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-semibold">Mensuel</p>
          <p className="text-xs text-gray-500">Pour plus de flexibilité</p>
        </div>
      </div>
      <div
        className={`relative flex justify-center items-center gap-4 border-1 p-4 rounded-r-xl hover:bg-gray-100 hover:border-dark cursor-pointer ${
          periodicity === Periodicity.Yearly ? "bg-gray-200 border-dark hover:bg-gray-200" : ""
        }`}
        onClick={() => setPeriodicity(Periodicity.Yearly)}
      >
        <FaRegCalendarAlt size={20} />
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-semibold">Annuel</p>
          <p className="text-xs text-gray-500">Meilleur rapport qualité prix</p>
        </div>
        <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 rotate-6 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
          -20% de réduction
        </span>
      </div>
    </section>
  );
}
