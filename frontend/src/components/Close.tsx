import { Tooltip } from "@heroui/tooltip";
import { X } from "lucide-react";

type CloseProps = {
  onClick: () => void;
};

export default function Close({ onClick }: CloseProps) {
  const handleSwitch = () => {
    onClick();
  };
  return (
    <Tooltip
      content="Annuler"
      showArrow={true}
      color="foreground"
      className="text-xs"
    >
      <div
        className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
        onClick={handleSwitch}
      >
        <X className="size-4 text-black active:text-gray-500" />
      </div>
    </Tooltip>
  );
}
