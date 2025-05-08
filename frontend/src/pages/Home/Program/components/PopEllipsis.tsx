import { ProgramStatus } from "@/graphql/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { CheckCircle, Ellipsis, PenIcon, Trash, Workflow } from "lucide-react";
import { useState } from "react";

type PopEllipsisProps = {
  onArchive: () => void;
  status: ProgramStatus;
  navigate: () => void;
  onValidate: () => void;
  onDelete: () => void;
  openGeneration: () => void;
};

export default function PopEllipsis({
  onArchive,
  status,
  navigate,
  onValidate,
  onDelete,
  openGeneration,
}: PopEllipsisProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    navigate();
    setIsOpen(false);
  };

  const handleValidate = () => {
    onValidate();
    setIsOpen(false);
  };

  const handleArchive = () => {
    onArchive();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      offset={0}
    >
      <PopoverTrigger>
        <div className="hover:bg-black/5 p-2 rounded-full cursor-pointer">
          <Ellipsis className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="rounded-md p-0">
        <div className="flex flex-col items-start min-w-[170px]">
          {status === ProgramStatus.Published && (
            <button
              className="w-full relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={() => {
                setIsOpen(false);
                openGeneration();
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-start gap-2 rounded-md bg-white hover:bg-gray-100 px-3 py-1 text-sm font-medium text-dark backdrop-blur-3xl">
                <Workflow className="w-4 h-4" />
                <p>Générer !</p>
              </span>
            </button>
          )}
          <div
            className="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100"
            onClick={handleNavigate}
          >
            <PenIcon className="w-4 h-4" />
            <p>Modifier le programme</p>
          </div>
          {status !== ProgramStatus.Published &&
            status !== ProgramStatus.Archived && (
              <div
                className="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100"
                onClick={handleValidate}
              >
                <CheckCircle className="w-4 h-4" />
                <p>Valider le programme</p>
              </div>
            )}
          {status !== ProgramStatus.Archived && (
            <div
              className="w-full flex items-center gap-2 p-4 cursor-pointer text-red-500 hover:bg-gray-100"
              onClick={handleArchive}
            >
              <Trash className="w-4 h-4" />
              <p>Archiver le programme</p>
            </div>
          )}
          {status === ProgramStatus.Archived && (
            <div
              className="w-full flex items-center gap-2 p-4 cursor-pointer text-red-500 hover:bg-gray-100"
              onClick={handleDelete}
            >
              <Trash className="w-4 h-4" />
              <p>Supprimer le programme</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
