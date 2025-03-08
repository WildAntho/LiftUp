import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@heroui/tooltip";
import { SquarePen, X } from "lucide-react";

type HeaderProfilProps = {
  isShow: boolean;
  onClick: () => void;
  title: string;
  tooltip: string;
  withEdit?: boolean;
};

export default function HeaderProfile({
  isShow,
  onClick,
  title,
  tooltip,
  withEdit = true,
}: HeaderProfilProps) {
  return (
    <>
      <div className="w-full h-[40px] flex justify-start items-center gap-5 mb-5">
        <p className="text-2xl font-semibold">{title}</p>
        {isShow && withEdit && (
          <Tooltip
            content={tooltip}
            showArrow={true}
            color="foreground"
            className="text-xs"
          >
            <div
              className="group hover:bg-black/5 p-2 rounded-full cursor-pointer"
              onClick={() => onClick()}
            >
              <SquarePen className="size-5 text-gray-500 group-hover:text-black group-active:text-gray-500" />
            </div>
          </Tooltip>
        )}
        {!isShow && (
          <Tooltip
            content="Annuler"
            showArrow={true}
            color="foreground"
            className="text-xs"
          >
            <div
              className="group hover:bg-black/5 p-2 rounded-full cursor-pointer"
              onClick={() => onClick()}
            >
              <X className="size-5 text-gray-500 group-hover:text-black group-active:text-gray-500" />
            </div>
          </Tooltip>
        )}
      </div>
      <Separator />
    </>
  );
}
