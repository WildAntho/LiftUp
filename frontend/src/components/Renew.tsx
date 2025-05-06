import { RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { capitalize } from "@/services/utils";
import ConfirmModal from "./modals/ConfirmModal";
import { useState } from "react";
import { Tooltip } from "@heroui/tooltip";

type RenewProps = {
  loading: boolean;
  onClick: (id: string) => void;
  endDate: string;
  id: string;
};

export default function Renew({ loading, onClick, id, endDate }: RenewProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Tooltip
        content="Renouveler le suivi"
        showArrow={true}
        color="foreground"
        className="text-xs"
      >
        <div
          className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <RefreshCcw className={`size-4 text-black`} />
        </div>
      </Tooltip>
      <ConfirmModal
        isOpen={open}
        title="Renouvellement"
        onClose={() => setOpen(false)}
        description="Êtes-vous sûr de vouloir renouveler l'abonnement de cet élève ?"
        additionalContent={
          endDate ? (
            <p className="text-gray-500">
              La nouvelle date de fin sera:{" "}
              <span className="text-dark font-semibold text-md">
                {capitalize(
                  format(new Date(endDate), "EEEE d MMMM yyyy", { locale: fr })
                )}
              </span>
            </p>
          ) : (
            <p>La nouvelle date de fin est indisponible.</p>
          )
        }
        onConfirm={() => onClick(id as string)}
        type="info"
        loading={loading}
      />
    </>
  );
}
