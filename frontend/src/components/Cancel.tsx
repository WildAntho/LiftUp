import { Button } from "@heroui/react";

type CancelProps = {
  onClick: () => void;
  title: string;
};

export default function Cancel({ onClick, title }: CancelProps) {
  return (
    <Button
      className="group border-1 shadow-none text-dark h-[55px] w-[150px] rounded-xl bg-white hover:translate-y-[-2px] transition-all duration-200"
      onPress={onClick}
    >
      <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
        {title}
      </p>
    </Button>
  );
}
