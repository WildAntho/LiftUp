import { Button } from "@heroui/react";
import { Save } from "lucide-react";

type SavingProps = {
  onClick: () => void;
  loading?: boolean;
};

export default function Saving({ onClick, loading }: SavingProps) {
  return (
    <Button
      data-testid="saving-button"
      className="group shadow-none text-white h-[55px] w-[230px] rounded-xl bg-dark hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
      onPress={onClick}
      startContent={<Save size={16} />}
      isLoading={loading}
    >
      <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
        Sauvegarder
      </p>
    </Button>
  );
}
