import { UserWithoutPassword } from "@/services/zustand/userStore";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useSelectUsersQuery } from "@/graphql/hooks";
import UserCard from "../UserCard";
import { Input } from "@heroui/react";

type SelectStudentModalProps = {
  currentUser: UserWithoutPassword | null;
  refetch?: {
    refetchStudents: () => void;
    refetchSent: () => void;
    refetchRequest: () => void;
  };
};

export default function SelectStudentModal({
  currentUser,
  refetch,
}: SelectStudentModalProps) {
  const [search, setSearch] = useState<string>("");
  const {
    data,
    loading,
    refetch: refetchUsers,
  } = useSelectUsersQuery({
    variables: {
      id: currentUser ? currentUser.id.toString() : "",
      input: search,
    },
    fetchPolicy: "cache-and-network",
  });
  const allStudents = data?.selectUsers;
  return (
    <section className="flex flex-col justify-center items-center gap-5 w-full">
      <Input
        labelPlacement="outside"
        placeholder="Rechercher un élève"
        startContent={
          <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      {!loading ? (
        <section className="flex flex-col items-start justify-start gap-2 w-full">
          {allStudents?.map((s: UserWithoutPassword) => (
            <div className="w-full" key={s.id}>
              <UserCard
                user={s}
                canAdd={true}
                refetch={refetch}
                refetchUsers={refetchUsers}
              />
            </div>
          ))}
        </section>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </section>
  );
}
