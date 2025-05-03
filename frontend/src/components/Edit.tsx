import { Tooltip } from "@heroui/tooltip";
import { Pencil } from "lucide-react";

type EditProps = {
  onClick: () => void;
};

export default function Edit({ onClick }: EditProps) {
  const handleSwitch = () => {
    onClick();
  };
  return (
    <Tooltip
      content="Editer"
      showArrow={true}
      color="foreground"
      className="text-xs"
    >
      <div
        className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
        onClick={handleSwitch}
      >
        <Pencil className="size-4 text-black active:text-gray-500" />
      </div>
    </Tooltip>
  );
}
