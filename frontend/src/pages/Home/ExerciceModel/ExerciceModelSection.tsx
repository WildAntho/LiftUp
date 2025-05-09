import TabExercices from "../Program/components/Configuration/components/TabExercices";
import { useState } from "react";
import { ExerciceModel } from "@/graphql/hooks";
import { Separator } from "@/components/ui/separator";

export default function ExerciceModelSection() {
  const [activeExercices, setActiveExercices] = useState<
    ExerciceModel[] | null
  >(null);
  return (
    <section className="w-full h-full flex flex-col justify-start items-center bg-white rounded-2xl p-4 pb-8 gap-4">
      <p className="pt-10 pl-4 mt-2 w-full text-start font-semibold text-xl">
        Tous les exercices
      </p>
      <Separator />
      <section className="w-full flex justify-center items-start overflow-y-auto">
        <div className="overflow-y-auto px-4 w-full 2xl:w-[80%]">
          <div className="w-full flex flex-col items-center justify-start gap-10 pb-4">
            <TabExercices
              activeExercices={activeExercices}
              setActiveExercices={setActiveExercices}
              disableSelection={true}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
