import { Play } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import ConfirmModal from "./modals/ConfirmModal";
import { useState } from "react";

type ActivateProps = {
  loading: boolean;
  onClick: (id: string, offerId: string) => void;
  id: string;
  offerId: string;
};

export default function Activate({
  loading,
  onClick,
  id,
  offerId,
}: ActivateProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Tooltip
        content="Démarrer le suivi"
        showArrow={true}
        color="foreground"
        className="text-xs"
      >
        <div
          className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Play className={`size-4 text-black`} />
        </div>
      </Tooltip>
      <ConfirmModal
        isOpen={open}
        title="Activation"
        type="info"
        onClose={() => setOpen(false)}
        description="Êtes-vous sûr de vouloir démarrer le suivi de cet élève ?"
        onConfirm={() => onClick(id as string, offerId)}
        loading={loading}
      />
    </>
  );
}
