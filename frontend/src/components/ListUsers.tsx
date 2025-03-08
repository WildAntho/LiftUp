import { Button } from "@/components/ui/button";
import { StudentStore } from "@/services/zustand/studentStore";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import UserAvatar from "./UserAvatar";

type ListUsersProps = {
  currentStudent: StudentStore | null;
  student?: UserWithoutPassword;
  handleGetStudent: (s: UserWithoutPassword) => void;
};

export default function ListUsers({
  currentStudent,
  student,
  handleGetStudent,
}: ListUsersProps) {
  return (
    <Button
      variant="ghost"
      className={`${
        currentStudent && currentStudent.email === student?.email
          ? "bg-primary bg-opacity-10 w-full text-primary justify-start gap-2"
          : "hover:bg-primary hover:bg-opacity-10 w-full justify-start gap-2"
      } hover:bg-primary hover:bg-opacity-10 h-[50px]`}
      onClick={() => {
        handleGetStudent(student as UserWithoutPassword);
      }}
    >
      <UserAvatar avatar={student?.avatar ?? ""} />
      <p
        className={`${
          currentStudent && currentStudent.email === student?.email
            ? "text-primary"
            : "text-black"
        } text-xs`}
      >
        {student?.firstname + " " + student?.lastname}
      </p>
    </Button>
  );
}
