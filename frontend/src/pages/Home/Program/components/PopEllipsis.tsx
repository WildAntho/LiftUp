import { ProgramStatus } from "@/graphql/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { CheckCircle, Ellipsis, PenIcon, Trash } from "lucide-react";
import { useState } from "react";

type PopEllipsisProps = {
  onDelete: () => void;
  status: ProgramStatus;
  navigate: () => void;
  onValidate: () => void;
};

export default function PopEllipsis({
  onDelete,
  status,
  navigate,
  onValidate,
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
              onClick={handleDelete}
            >
              <Trash className="w-4 h-4" />
              <p>Archiver le programme</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
