import { Separator } from "@/components/ui/separator";
import { Program } from "@/graphql/hooks";
import { FaFire } from "react-icons/fa6";
import ProgramPlan from "./ProgramPlan";

type ProgramCoachProps = {
  programs: Program[];
  isPrev: boolean;
};

export default function ProgramCoach({ programs, isPrev }: ProgramCoachProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-5 mt-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <FaFire size={28} />
          Programmes proposés
        </p>
        <Separator />
      </div>
      <section className="w-full grid grid-cols-2 gap-2">
        {programs?.map((p) => (
          <div key={p.id} className="w-full">
            <ProgramPlan program={p as Program} isPrev={isPrev} />
          </div>
        ))}
      </section>
    </section>
  );
}
