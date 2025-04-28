import {
  ChevronDown,
  Grip,
  Info,
  CheckCircle,
  BarChart2,
  Layers,
  Activity,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import IntensityComponent from "./IntensityComponent";
import Delete from "./Delete";
import Edit from "./Edit";
import { ExerciceType, Maybe } from "@/graphql/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react";
import { picture } from "../services/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ExerciceCardProps = {
  id: string;
  title: string;
  serie: number;
  rep: number;
  weight?: Maybe<number>;
  intensity?: Maybe<number>;
  notes?: string | null;
  type?: ExerciceType | null;
  isShow: boolean;
  onUpdate?: (exerciceId: string) => void;
  onDelete?: (exerciceId: string) => void;
};

export default function ExerciceCard({
  id,
  title,
  serie,
  rep,
  weight,
  intensity,
  type,
  isShow,
  notes,
  onUpdate,
  onDelete,
}: ExerciceCardProps) {
  const handleDelete = (id: string) => {
    if (onDelete) onDelete(id);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Collapsible
      ref={setNodeRef}
      style={style}
      className="group/collapsible flex flex-col gap-4 w-full p-4 border border-gray-200 bg-white rounded-lg shadow-md"
    >
      <CollapsibleTrigger className="w-full">
        <section className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            {!isShow && (
              <Tooltip
                content="Déplacer"
                showArrow={true}
                color="foreground"
                className="text-xs"
              >
                <div
                  {...attributes}
                  {...listeners}
                  className="hover:bg-gray-200 p-3 rounded-full cursor-move"
                >
                  <Grip size={18} className="text-gray-500" />
                </div>
              </Tooltip>
            )}
            {picture.find((p) => p.type === type?.value)?.image}
            <div className="flex flex-col justify-center items-start gap-1">
              <p className="text-md font-semibold text-gray-800">{title}</p>
              <p className="text-xs text-gray-500">
                {serie} {`série${serie > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <div className="flex justify-content items-center gap-3">
            {isShow && notes && (
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
            {!isShow && (
              <Edit
                onClick={() => {
                  if (onUpdate) onUpdate(id);
                }}
              />
            )}
            {!isShow && (
              <Delete
                onDelete={() => handleDelete(id)}
                description="Êtes-vous sûr de vouloir supprimer cet exercice ?"
                title="Suppression d'un exercice"
              />
            )}
            <ChevronDown className="ml-auto text-gray-400 scale-75 transition duration-300 transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </section>
      </CollapsibleTrigger>
      <CollapsibleContent>
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
        {intensity && (
          <section className="flex justify-center items-center mt-4 w-full">
            <div className="flex flex-col items-center w-full max-w-[900px] gap-2 py-2 px-3 bg-gray-50 rounded-lg border border-gray-200">
              <Activity size={20} className="text-red-500" />
              <p className="text-xs font-medium text-gray-600">Intensité</p>
              <div className="w-full">
                <IntensityComponent value={intensity} disabled={true} />
              </div>
            </div>
          </section>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
