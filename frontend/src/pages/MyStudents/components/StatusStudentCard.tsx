import { StatusStudent } from "@/type";
import { ReactNode } from "react";

interface StatusCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  type?: StatusStudent;
  isActive: boolean;
}

const getStatusStudent = (type?: StatusStudent) => {
  switch (type) {
    case StatusStudent.active:
      return {
        bg: "bg-green-100",
        text: "text-green-600",
      };
    case StatusStudent.waiting:
      return {
        bg: "bg-blue-100",
        text: "text-blue-600",
      };
    case StatusStudent.end_7:
      return {
        bg: "bg-orange-100",
        text: "text-orange-400",
      };
    case StatusStudent.expired:
      return {
        bg: "bg-red-100",
        text: "text-red-600",
      };
    default:
      return {
        bg: "bg-gray-200",
        text: "text-gray-600",
      };
  }
};

export default function StatusStudentCard({
  icon,
  title,
  description,
  type,
  isActive,
}: StatusCardProps) {
  const colors = getStatusStudent(type);

  return (
    <div
      className={`w-44 h-16 ${
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
