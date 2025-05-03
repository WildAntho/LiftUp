import { Button } from "@heroui/react";
import { Check } from "lucide-react";

type ConfirmButtonProps = {
  onClick: () => void;
  title: string;
  loading?: boolean;
};

export default function ConfirmButton({
  onClick,
  title,
  loading,
}: ConfirmButtonProps) {
  return (
    <Button
      className="group shadow-none text-white h-[55px] w-[230px] rounded-xl bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
      onPress={onClick}
      startContent={<Check size={16} />}
      isLoading={loading}
    >
      <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
        {title}
      </p>
    </Button>
  );
}
