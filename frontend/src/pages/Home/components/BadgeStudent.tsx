import { Tooltip, User } from "@heroui/react";
import { useStudentStore } from "@/services/zustand/studentStore";
import { X } from "lucide-react";
import { uploadURL } from "@/services/utils";
import imgDefault from "../../../../public/default.jpg";

type BadgeStudentProps = {
  student: {
    id: string;
    firstname: string;
    lastname: string;
    avatar: string;
  } | null;
};

export default function BadgeStudent({ student }: BadgeStudentProps) {
  const clearStudent = useStudentStore((state) => state.clear);
  const handleClearStudent = () => {
    clearStudent();
  };

  return (
    <section className="absolute -top-[55px] right-0 flex justify-center items-center gap-2 bg-dark text-white p-2 rounded-full">
      <User
        avatarProps={{
          src:
            student && student.avatar
              ? `${uploadURL + student.avatar}`
              : imgDefault,
        }}
        name={student && student.firstname + " " + student.lastname}
      />
      <Tooltip
        content="Revenir à ma programmation"
        color="foreground"
        showArrow={true}
        className="text-xs"
      >
        <X
          className="size-5 text-white hover:text-gray-200 cursor-pointer"
          onClick={handleClearStudent}
        />
      </Tooltip>
    </section>
  );
}
