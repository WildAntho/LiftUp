import { Offer, useDeleteOfferMutation } from "@/graphql/hooks";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import Edit from "./Edit";
import Delete from "./Delete";
import { useState } from "react";
import OfferModal from "./modals/OfferModal";
import ConfirmModal from "./modals/ConfirmModal";

type OfferProps = {
  offer: Omit<Offer, "user"> | undefined;
  refetch?: () => void;
  isMyOffer?: boolean;
};

export default function OfferCard({
  offer,
  refetch,
  isMyOffer = false,
}: OfferProps) {
  const [deleteOffer, { loading }] = useDeleteOfferMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    await deleteOffer({
      variables: { id: offer?.id as string },
    });
    refetch?.();
  };
  return (
    <>
      <section
        className={`flex justify-between items-center h-full w-full shadow-md p-4 rounded-xl border border-gray-100 ${
          !offer?.availability && "bg-gray-100 text-gray-500"
        }`}
      >
        <div className="flex flex-col items-start justify-start gap-4 w-[80%] pr-2">
          <section className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-5">
              <Badge
                className={`text-sm font-semibold truncate ${
                  !offer?.availability && "text-gray-500"
                }`}
              >
                {offer?.name}
              </Badge>
              <p className="text-xs text-gray-500">
                Type : {offer?.category.label}
              </p>
              <p className="text-xs">-</p>
              <p className="text-xs text-gray-500">
                Durée : {offer?.durability} mois
              </p>
            </div>
            {isMyOffer && (
              <div className="flex justify-center items-center">
                <Edit onClick={openModal} />
                <Delete onClick={() => setOpenConfirm(true)} />
              </div>
            )}
          </section>
          <p className="text-xs">{offer?.description}</p>
        </div>
        <div className="relative flex flex-col justify-center items-center h-full w-[20%]">
          <Separator orientation="vertical" className="absolute left-0 my-4" />
          <p
            className={`text-lg font-semibold ${
              !offer?.availability ? "text-gray-500" : "text-primary"
            }`}
          >
            {offer?.price}€/mois
          </p>
          <p className="text-xs">
            {offer?.availability ? "Disponible" : "Complet"}
          </p>
        </div>
      </section>
      <OfferModal
        open={open}
        onClose={closeModal}
        refetch={refetch}
        offer={offer}
      />
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        description="Êtes-vous sûr de vouloir supprimer cette offre ?"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}
