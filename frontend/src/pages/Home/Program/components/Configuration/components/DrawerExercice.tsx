import { Tooltip } from "@heroui/tooltip";
import { Plus, PlusCircle } from "lucide-react";
import TabExercices from "./TabExercices";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddExercicePlanInput, ExerciceModel } from "@/graphql/hooks";
import { Drawer, DrawerContent } from "@heroui/react";

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
    <>
      <Tooltip
        content="Ajouter un exercice"
        className="text-xs"
        showArrow={true}
        color="foreground"
      >
        <div
          className="group flex justify-center items-center w-12 h-12 rounded-full my-2 cursor-pointer text-tertiary border border-tertiary border-opacity-20 bg-tertiary bg-opacity-20 hover:bg-tertiary hover:bg-opacity-20 shadow-sm p-2 hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="transition-all duration-200 group-hover:rotate-90" />
        </div>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom"
        size="5xl"
      >
        <DrawerContent>
          <div className="flex flex-col h-[80vh] w-full items-center">
            <div className="px-4 sticky top-0 bg-white z-10 w-[80%] 2xl:w-[60%] flex justify-between items-end pb-2">
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 p-4 pb-2">
                  <p className="font-semibold">Tous les exercices</p>
                  <p className="text-xs text-gray-500">
                    Choisissez un/des exercice(s)
                  </p>
                </div>
              </div>

              {activeExercices && activeExercices.length > 0 && (
                <Button
                  className="h-full flex items-center justify-center gap-2 text-dark bg-white rounded-xl shadow-sm border border-gray-300 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1"
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
            <Separator className="w-[80%] 2xl:w-[60%]" />
            <section className="w-full flex justify-center items-start overflow-y-auto">
              <div className="overflow-y-auto px-4 w-[80%] 2xl:w-[60%]">
                <div className="w-full flex flex-col items-center justify-start gap-10 py-4">
                  <TabExercices
                    activeExercices={activeExercices}
                    setActiveExercices={setActiveExercices}
                  />
                </div>
              </div>
            </section>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
