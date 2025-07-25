import { Button } from "@heroui/react";
import { ReactElement } from "react";

type InvoiceButtonProps = {
  icon?: ReactElement;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: "orange" | "blue" | "green" | "red" | "purple" | "pink";
};

export default function InvoiceButton({
  icon,
  title,
  onClick,
  disabled,
  loading,
  color = "orange",
}: InvoiceButtonProps) {
  // Mapping des couleurs avec les classes Tailwind complètes
  const colorClasses = {
    orange:
      "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
    blue: "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
    green:
      "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600",
    red: "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600",
    purple:
      "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600",
    pink: "bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600",
  };

  return (
    <Button
      className={`group h-[55px] relative inline-flex items-center justify-center gap-3 px-8 py-4 ${colorClasses[color]} text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ease-in-out`}
      onPress={onClick}
      isDisabled={disabled}
      isLoading={loading}
    >
      {icon}
      <span>{title}</span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
    </Button>
  );
}
