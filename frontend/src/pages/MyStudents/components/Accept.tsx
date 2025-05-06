import { Tooltip } from "@heroui/tooltip";
import { Check } from "lucide-react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";

type AcceptProps = {
  onClick: () => void;
  loading?: boolean;
};

export default function Accept({ onClick, loading }: AcceptProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Tooltip
          content="Accepter"
          showArrow={true}
          color="foreground"
          className="text-xs"
        >
          <Check className={`size-4 text-green-500 active:text-green-700`} />
        </Tooltip>
      </div>
      <ConfirmModal
        isOpen={open}
        title="Validation"
        type="success"
        onClose={() => setOpen(false)}
        description="Êtes-vous sûr de vouloir accepter cette demande ?"
        onConfirm={onClick}
        loading={loading}
      />
    </>
  );
}
