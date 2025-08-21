import { Tooltip } from "@heroui/tooltip";
import { Info } from "lucide-react";

type InfoPopUpProps = {
  title: string;
  description: string;
};

export default function InfoPopUp({ title, description }: InfoPopUpProps) {
  return (
    <Tooltip
      className="text-xs"
      content={
        <div className="flex flex-col items-start justify-center p-2">
          <p>{title}</p>
          <p>- {description}</p>
        </div>
      }
      showArrow={true}
      color="foreground"
      placement="bottom"
    >
      <Info
        size={18}
        className="text-gray-400 cursor-pointer hover:text-black"
      />
    </Tooltip>
  );
}
