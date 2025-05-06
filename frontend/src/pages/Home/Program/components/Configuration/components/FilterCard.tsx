import { FilterCardEnum } from "@/services/utils";
import { ReactNode } from "react";

interface FilterCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  type: FilterCardEnum;
  isActive: boolean;
}

const getStatusColors = (type: FilterCardEnum) => {
  switch (type) {
    case FilterCardEnum.MINE:
      return {
        bg: "bg-green-100",
        text: "text-green-600",
      };
    case FilterCardEnum.ALL:
      return {
        bg: "bg-blue-100",
        text: "text-blue-600",
      };
    case FilterCardEnum.FAVORITE:
      return {
        bg: "bg-red-100",
        text: "text-red-600",
      };
    case FilterCardEnum.NEW:
      return {
        bg: "bg-orange-100",
        text: "text-orange-600",
      };
  }
};

export default function FilterCard({
  icon,
  title,
  description,
  type,
  isActive,
}: FilterCardProps) {
  const colors = getStatusColors(type);

  return (
    <div
      className={`w-48 h-16 ${
        isActive ? colors.bg : "bg-gray-50 hover:bg-gray-100"
      } rounded-lg p-2 flex items-center justify-start gap-2 border border-gray-100 cursor-pointer transition-all duration-200`}
    >
      <div className={`${colors.text}`}>{icon}</div>
      <div>
        <h3
          className={`${
            isActive ? colors.text : "text-gray-700"
          } text-sm font-medium leading-tight`}
        >
          {title}
        </h3>
        <p className="text-gray-500 text-xs leading-snug">{description}</p>
      </div>
    </div>
  );
}
