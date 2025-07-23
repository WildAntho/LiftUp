import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <img
        src="accessdenied.webp"
        alt="403 Forbidden"
        className="w-full max-w-md"
      />
      <Button
        className={`group h-[55px] relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-dark to-gray-500 hover:from-drak hover:to-gray-400 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ease-in-out`}
        onPress={() => navigate("/")}
      >
        <span>Retour à l’accueil</span>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
      </Button>
    </div>
  );
}
