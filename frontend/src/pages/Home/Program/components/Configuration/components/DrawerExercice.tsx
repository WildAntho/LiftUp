import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tooltip } from "@heroui/tooltip";
import { Plus, PlusCircle } from "lucide-react";
import TabExercices from "./TabExercices";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddExercicePlanInput, ExerciceModel } from "@/graphql/hooks";

type DrawerExerciceProps = {
  onCreate: (exercices: AddExercicePlanInput[]) => void;
};

export default function DrawerExercice({ onCreate }: DrawerExerciceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeExercices, setActiveExercices] = useState<
    ExerciceModel[] | null
  >(null);

  const handleCreate = () => {
    onCreate(activeExercices as AddExercicePlanInput[]);
    setIsOpen(false);
    setActiveExercices(null);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Tooltip
          content="Ajouter un exercice"
          className="text-xs"
          showArrow={true}
          color="foreground"
        >
          <div className="group flex justify-center items-center w-12 h-12 rounded-full my-2 cursor-pointer text-tertiary border border-tertiary border-opacity-20 bg-tertiary bg-opacity-20 hover:bg-tertiary hover:bg-opacity-20 shadow-sm p-2 hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
            <Plus className="transition-all duration-200 group-hover:rotate-90" />
          </div>
        </Tooltip>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col h-[80vh] w-full items-center">
          <div className="px-4 sticky top-0 bg-white z-10 w-[70%] h-20 flex justify-between items-end pb-2">
            <div className="flex items-center mb-2">
              <div className="flex-shrink-0">
                <DrawerTitle>Tous les exercices</DrawerTitle>
                <DrawerDescription>Choisissez un exercices</DrawerDescription>
              </div>
            </div>

            {activeExercices && activeExercices.length > 0 && (
              <Button
                className="h-full flex items-center justify-center gap-2 text-dark bg-white rounded-xl shadow-md border border-gray-300 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1"
                onClick={handleCreate}
              >
                <PlusCircle size={16} />
                <span>
                  Ajouter {activeExercices?.length}{" "}
                  {`exercice${activeExercices?.length > 1 ? "s" : ""}`}
                </span>
              </Button>
            )}
          </div>
          <Separator className="w-[70%]" />
          <div className="flex-1 overflow-y-auto px-4 w-[70%]">
            <div className="w-full flex flex-col items-center justify-start gap-10 py-4">
              <TabExercices
                activeExercices={activeExercices}
                setActiveExercices={setActiveExercices}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
