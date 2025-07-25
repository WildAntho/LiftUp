import { ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { ReactElement } from "react";

type SlideButtonProps = {
    title: string
    icon: ReactElement
}

export function SlideButton({ title, icon }: SlideButtonProps) {
  return (
    <Button className="group relative overflow-hidden" size="lg">
      <span className="flex justify-center items-center gap-2 mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {icon}
        {title}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/6 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
