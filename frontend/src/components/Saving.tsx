import { Loader2, Save } from "lucide-react";
import { Button } from "./ui/button";

type SavingProps = {
  onClick: () => void;
  loading?: boolean;
};

export default function Saving({ onClick, loading }: SavingProps) {
  return (
    <Button
      className="group shadow-none text-white h-[55px] w-[25%] rounded-xl bg-dark hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
      onClick={onClick}
      disabled={loading}
    >
      <Save />
      <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
        {loading && <Loader2 className="animate-spin" />}
        Sauvegarder
      </p>
    </Button>
  );
}
