import { Button } from "@heroui/react";
import { Calendar, CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home?tab=calendar");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
        <CheckCircleIcon className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement validé</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Ton paiement a bien été traité. Merci pour ta confiance!
      </p>
      <Button
        data-testid="saving-button"
        className="group shadow-none text-white h-[55px] w-[230px] rounded-xl bg-dark hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
        onPress={handleClick}
        startContent={<Calendar size={16} />}
      >
        <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
          Retourner à mon calendrier
        </p>
      </Button>
    </div>
  );
}
