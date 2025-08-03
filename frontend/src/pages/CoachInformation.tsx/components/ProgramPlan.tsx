import LexicalEditorComponent from "@/components/LexicalEditor/LexicalEditorComponent";
import { Separator } from "@/components/ui/separator";
import { Program } from "@/graphql/hooks";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

type ProgramPlanProps = {
  program: Program;
  isPrev: boolean;
};

export default function ProgramPlan({ program, isPrev }: ProgramPlanProps) {
  const navigate = useNavigate();
  const content = program.description ? JSON.parse(program.description) : null;
  const getPricePerWeek = (price: number, duration: number) => {
    return Math.round((price / duration) * 10) / 10;
  };
  return (
    <div className="w-full h-[380px] flex flex-col items-start justify-center gap-5 bg-white shadow-sm p-4 rounded-xl border border-gray-200 overflow-hidden">
      <div className="w-full h-full">
        <h2
          className="text-md font-semibold hover:underline underline-offset-2 decoration-1 line-clamp-1 cursor-pointer"
          onClick={() => {
            if (!isPrev) navigate(`/marketplace/program/${program.id}`);
          }}
        >
          {program.title}
        </h2>
        <div className="w-full h-[90%] relative">
          <div className="text-gray-500 text-sm absolute inset-0 overflow-hidden">
            <LexicalEditorComponent value={content} readOnly={true} />
            <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-semibold text-primary">
              {program.price}€
            </span>
            <span className="text-sm text-gray-500">au total</span>
          </div>
          {program.price && (
            <div className="text-xs text-gray-400 w-full text-start">
              {getPricePerWeek(program.price, program.duration)}€/semaine
            </div>
          )}
        </div>
        <Button
          data-testid="saving-button"
          className="group shadow-none text-white h-[45px] w-[100px] rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
          onPress={() => navigate(`/marketplace/program/${program.id}`)}
          isDisabled={isPrev}
        >
          <p className="text-sm transition-all duration-200 group-hover:translate-x-1 flex justify-center items-center gap-2">
            Voir plus
          </p>
        </Button>
      </div>
    </div>
  );
}
