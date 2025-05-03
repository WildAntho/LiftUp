import { Tooltip } from "@heroui/tooltip";
import { Trash2 } from "lucide-react";

type DeleteProps = {
  onClick: () => void;
};

export default function Delete({ onClick }: DeleteProps) {
  return (
    <Tooltip
      content="Supprimer"
      showArrow={true}
      color="foreground"
      className="text-xs"
    >
      <div
        className="hover:bg-black/5 hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
        onClick={onClick}
      >
        <Trash2 className={`size-4 text-black active:text-gray-500`} />
      </div>
    </Tooltip>
  );
}
