import DateInput from "@/components/DateInput";
import { Separator } from "@/components/ui/separator";
import { Program } from "@/graphql/hooks";
import { Button, Checkbox } from "@heroui/react";
import { format } from "date-fns";
import { BadgeEuro, Calendar, Dumbbell, MessageCircleMore } from "lucide-react";
import { useState } from "react";

type BuyFormProps = {
  program: Program;
  coachId?: string;
  onSubscribe: (startDate: string, politic: boolean) => void;
  loading: boolean;
};

export default function BuyForm({
  program,
  onSubscribe,
  loading,
}: BuyFormProps) {
  const [politic, setPolitic] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  return (
    <section className="w-full h-full flex flex-col items-start justify-start py-2">
      <p className="w-full flex justify-center font-semibold mb-4">
        {program?.title}
      </p>
      <Separator />
      <section className="w-full flex flex-col items-start justify-center gap-4 my-4">
        <section className="w-full flex flex-col items-start justify-center gap-8">
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-md font-semibold">Ce plan inclut:</p>
            <div className="flex flex-col items-start justify-center gap-1">
              <div className="flex justify-center items-center gap-2 text-sm">
                <Calendar size={16} className="text-primary" />
                <p>{program?.duration} semaines d'entraînement</p>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm">
                <MessageCircleMore size={16} className="text-primary" />
                <p>Echanges avec l'entraîneur</p>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm">
                <Dumbbell size={16} className="text-primary" />
                <p>Accès aux ressources fournies par l'entraîneur</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="text-md font-semibold">Choisi la date de début</p>
            <DateInput
              date={startDate}
              setDate={setStartDate}
              withLabel={false}
            />
          </div>
        </section>
        <Separator />
        <div className="w-full flex flex-col justify-center items-end pr-4">
          <p className="text-sm">Total à payer:</p>
          <p className="text-xl font-bold text-primary">{program?.price}€</p>
        </div>
        <Button
          className="group cursor-pointer shadow-none text-white h-[55px] w-full rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
          onPress={() => onSubscribe(startDate, politic)}
          startContent={<BadgeEuro size={16} />}
          isDisabled={!politic}
          isLoading={loading}
        >
          <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
            Acheter le programme
          </p>
        </Button>
        <Checkbox isSelected={politic} onValueChange={setPolitic}>
          <p className="text-xs">
            En cochant cette case, j’accepte que l’accès à mon programme démarre
            immédiatement et je renonce expressément à mon droit de
            rétractation.
          </p>
        </Checkbox>
      </section>
    </section>
  );
}
