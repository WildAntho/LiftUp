import CrewModal from "@/components/modals/CrewModal";
import { AvatarGroup } from "@heroui/react";
import { useDeleteCrewMutation } from "@/graphql/hooks";
import Delete from "./Delete";
import Edit from "./Edit";
import { useState } from "react";
import { UserWithoutPassword } from "@/services/zustand/userStore";
import UserAvatar from "./UserAvatar";

type CrewCardProps = {
  id: string;
  name: string;
  students: UserWithoutPassword[];
  refetch?: () => void;
  isEditable?: boolean;
};

export default function CrewCard({
  name,
  students,
  id,
  refetch,
  isEditable = false,
}: CrewCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  const [deleteCrew, { loading: loadingDelete }] = useDeleteCrewMutation();
  const handleDelete = async (id: string) => {
    await deleteCrew({
      variables: {
        id,
      },
    });
    if (refetch) refetch();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <section className="relative w-full h-full flex justify-start items-center gap-5">
      <CrewModal
        open={open}
        onClose={onClose}
        refetch={refetch}
        crew={{ id, students, name }}
      />
      <AvatarGroup max={3}>
        {students.map((s, i) => (
          <UserAvatar key={i} radius="lg" avatar={s.avatar ?? ""} />
        ))}
      </AvatarGroup>
      <p className="text-xs font-semibold">{name}</p>
      {isEditable && (
        <div className="flex justify-center items-center absolute top-0 right-0">
          <Edit onClick={handleOpen} />
          <Delete
            onClick={handleDelete}
            id={id}
            loading={loadingDelete}
            title="Êtes-vous sûr de vouloir supprimer cette équipe ?"
          />
        </div>
      )}
    </section>
  );
}
