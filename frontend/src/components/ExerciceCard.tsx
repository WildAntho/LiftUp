import { ChevronDown, Grip, Info } from "lucide-react";
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
      className={`group/collapsible flex flex-col gap-3 w-full p-4 bg-gray-50 drop-shadow-md rounded-lg`}
    >
      <CollapsibleTrigger className="w-full">
        <section className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            {picture.find((p) => p.type === type?.value)?.image}
            <p className="text-sm font-semibold">{title}</p>
          </div>
          <div className="flex justify-content items-center">
            {isShow && notes && (
              <Popover placement="left" showArrow={true}>
                <PopoverTrigger>
                  <Info className="size-6 mr-3 text-gray-400 hover:text-black" />
                </PopoverTrigger>
                <PopoverContent className="max-w-[250px] p-4">
                  <p className={`text-xs`}>
                    {notes ? notes : "Aucune note ajoutée"}
                  </p>
                </PopoverContent>
              </Popover>
            )}
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
                  className="hover:bg-black/5 p-2 rounded-full cursor-move"
                >
                  <Grip size={18} />
                </div>
              </Tooltip>
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
                description="Ëtes vous sur de vouloir supprimer cet exercice ?"
                title="Suppression d'un exercice"
              />
            )}
            <ChevronDown className="ml-auto scale-75 transition duration-300 transform group-data-[state=open]/collapsible:rotate-180" />
          </div>
        </section>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <section className="flex justify-start items-center gap-5 w-full">
          <section className="flex justify-center items-start flex-1">
            <div className="flex flex-col justify-center items-center gap-1 flex-1">
              <p className="text-xs font-bold">Série</p>
              <div className="border bg-white drop-shadow-md w-[50%] h-full p-2 flex justify-center items-center rounded-lg">
                {serie}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 flex-1">
              <p className="text-xs font-bold">Répétitions</p>
              <div className="border bg-white drop-shadow-md w-[50%] h-full p-2 flex justify-center items-center rounded-lg">
                {rep}
              </div>
            </div>
          </section>
          <div className="flex flex-col justify-center items-center gap-1 flex-1">
            <p className="text-xs font-bold">Charge</p>
            <div className="border bg-white drop-shadow-md w-[50%] h-full p-2 flex justify-center items-center rounded-lg">
              <p>{weight ? weight + "kg" : "Au choix"}</p>
            </div>
          </div>
        </section>
        {intensity ? (
          <section className="flex my-5 w-full justify-center">
            <div className="w-[90%]">
              <IntensityComponent size="md" value={intensity} disabled={true} />
            </div>
          </section>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  );
}
