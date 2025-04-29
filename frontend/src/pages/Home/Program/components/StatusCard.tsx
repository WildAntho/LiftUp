import { ProgramStatus } from "@/graphql/hooks";
import { ReactNode } from "react";

interface StatusCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  type: ProgramStatus;
  isActive: boolean;
}

const getStatusColors = (type: ProgramStatus) => {
  switch (type) {
    case ProgramStatus.Published:
      return {
        bg: "bg-green-100",
        text: "text-green-600",
      };
    case ProgramStatus.Draft:
      return {
        bg: "bg-blue-100",
        text: "text-blue-600",
      };
    case ProgramStatus.Archived:
      return {
        bg: "bg-orange-100",
        text: "text-orange-600",
      };
  }
};

export default function StatusCard({
  icon,
  title,
  description,
  type,
  isActive,
}: StatusCardProps) {
  const colors = getStatusColors(type);

  return (
    <div
      className={`w-50 h-15 ${
        isActive ? colors.bg : "bg-gray-50 hover:bg-gray-100"
      } rounded-xl p-3 flex items-center justify-center gap-3 border border-gray-100 cursor-pointer transition-all duration-200`}
    >
      <div className={colors.text}>{icon}</div>
      <div>
        <h3
          className={`${
            isActive ? colors.text : "text-gray-700"
          } text-sm font-medium`}
        >
          {title}
        </h3>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>
    </div>
  );
}
