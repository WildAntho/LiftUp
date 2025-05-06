import ConfirmModal from "@/components/modals/ConfirmModal";
import { Tooltip } from "@heroui/tooltip";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type RejectProps = {
  loading: boolean;
  onClick: () => void;
};

export default function Reject({ loading, onClick }: RejectProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Tooltip
          content="Refuser"
          showArrow={true}
          color="foreground"
          className="text-xs"
        >
          <Trash2 className={`size-4 text-red-500 active:text-red-700`} />
        </Tooltip>
      </div>
      <ConfirmModal
        isOpen={open}
        title="Suppression"
        onClose={() => setOpen(false)}
        description="Êtes-vous sûr de vouloir refuser cette demande ?"
        onConfirm={onClick}
        loading={loading}
      />
    </>
  );
}
