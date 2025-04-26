import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function CreateWorkout() {
  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full">
      <h2 className="text-2xl font-semibold text-center text-gray-500">
        Ajouter une nouvelle séance
      </h2>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-md text-gray-400 text-center">
          Créer un entraînement personnalisé en ajoutant des exercices.
        </p>
      </div>
      <Button className="group h-12 w-1/3 my-5 rounded-xl hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
        <PlusCircle />
        <p className="transition-all duration-200 group-hover:translate-x-1">
          Créer une séance
        </p>
      </Button>
    </section>
  );
}
