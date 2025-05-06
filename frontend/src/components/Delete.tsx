import { Tooltip } from "@heroui/tooltip";
import { Trash2 } from "lucide-react";
import ConfirmModal from "./modals/ConfirmModal";
import { useState } from "react";

type DeleteProps = {
  loading: boolean;
  onClick: (id: string) => void;
  id: string;
  title: string;
};

export default function Delete({ onClick, loading, id, title }: DeleteProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Tooltip
        content="Supprimer"
        showArrow={true}
        color="foreground"
        className="text-xs"
      >
        <div
          className="hover:bg-black/5 hover:bg-opacity-10 p-2 rounded-full cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Trash2 className={`size-4 text-black active:text-gray-500`} />
        </div>
      </Tooltip>
      <ConfirmModal
        isOpen={open}
        title="Suppression"
        onClose={() => setOpen(false)}
        description={`Êtes-vous sûr de vouloir supprimer cet ${title} ?`}
        onConfirm={() => onClick(id as string)}
        loading={loading}
      />
    </>
  );
}
