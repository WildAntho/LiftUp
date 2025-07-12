import { Offer, useDeleteOfferMutation } from "@/graphql/hooks";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import Edit from "./Edit";
import Delete from "./Delete";
import { useState } from "react";
import OfferModal from "./modals/OfferModal";

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
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleDelete = async (id: string) => {
    await deleteOffer({
      variables: { id },
    });
    refetch?.();
  };
  return (
    <>
      <section
        className={`flex justify-between items-center h-full w-full shadow-sm p-4 rounded-xl border border-gray-200 ${
          !offer?.availability && "bg-gray-100 text-gray-500"
        }`}
      >
        <div className="flex flex-col items-start justify-start gap-4 w-[80%] pr-2">
          <section className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-5">
              <div
                className={`text-md font-semibold truncate ${
                  !offer?.availability && "text-gray-500"
                }`}
              >
                {offer?.name}
              </div>
              <Badge className="text-xs text-blue-500">
                {offer?.category.label}
              </Badge>
              <Badge className="text-xs text-green-500">
                {offer?.durability} mois
              </Badge>
            </div>
            {isMyOffer && (
              <div className="flex justify-center items-center">
                <Edit onClick={openModal} />
                <Delete
                  onClick={handleDelete}
                  id={offer?.id as string}
                  loading={loading}
                  title="Êtes-vous sûr de vouloir supprimer cette offre ?"
                />
              </div>
            )}
          </section>
          <p className="text-sm">{offer?.description}</p>
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
    </>
  );
}
