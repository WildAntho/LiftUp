import { Tooltip } from "@heroui/tooltip";
import { ReactElement } from "react";

type LogoActionProps = {
  logo: ReactElement;
  onClick?: () => void;
  title: string;
};

export default function LogoAction({ logo, onClick, title }: LogoActionProps) {
  return (
    <Tooltip
      content={title}
      showArrow={true}
      color="foreground"
      className="text-xs"
    >
      <div
        className=" hover:bg-black/5 p-2 rounded-full cursor-pointer"
        onClick={onClick}
      >
        <span className="transition-all duration-200 ease-in-out text-gray-500 group-hover:text-dark">
          {logo}
        </span>
      </div>
    </Tooltip>
  );
}
