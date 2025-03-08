import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@heroui/react";
import { useStudentStore } from "@/services/zustand/studentStore";
import { X } from "lucide-react";

type BadgeStudentProps = {
  student: {
    id: string;
    firstname: string;
    lastname: string;
  } | null;
};

export default function BadgeStudent({ student }: BadgeStudentProps) {
  const clearStudent = useStudentStore((state) => state.clear);
  const handleClearStudent = () => {
    clearStudent();
  };

  return (
    <section className="absolute top-10 left-10 flex justify-center items-center gap-2">
      <Badge className="bg-black text-white">{`${student?.firstname} ${student?.lastname}`}</Badge>
      <Tooltip
        content="Revenir à ma programmation"
        color="foreground"
        showArrow={true}
        className="text-xs"
      >
        <X
          className="size-5 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={handleClearStudent}
        />
      </Tooltip>
    </section>
  );
}
