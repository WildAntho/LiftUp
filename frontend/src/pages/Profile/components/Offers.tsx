import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Offer, useGetMyOffersQuery } from "@/graphql/hooks";
import OfferCard from "@/components/OfferCard";
import OfferModal from "@/components/modals/OfferModal";

export default function Offers() {
  const { data: dataOffers, refetch } = useGetMyOffersQuery();
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => {
    setOpen(false);
  };

  const myOffers = dataOffers?.getCoachOffers ?? [];

  return (
    <>
      <section className="w-full h-full flex flex-col items-start justify-start py-4">
        <section className="w-[80%] 2xl:w-[60%] flex flex-col items-start justify-start gap-6">
          <div className="w-full flex justify-end items-center">
            <Button
              className="group h-12 w-[300px] text-black bg-gray-100 hover:bg-gray-200 border border-black rounded-xl hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
              onClick={() => setOpen(true)}
            >
              <PlusCircle className="transition-all duration-200 group-hover:rotate-90" />
              <p className="text-sm transition-all duration-200 group-hover:translate-x-1">
                Ajouter une nouvelle prestation
              </p>
            </Button>
          </div>
          {myOffers?.map((o) => (
            <div key={o.id} className="w-full">
              <OfferCard
                offer={o as Omit<Offer, "user">}
                refetch={refetch}
                isMyOffer={true}
              />
            </div>
          ))}
        </section>
      </section>
      <OfferModal open={open} onClose={closeModal} refetch={refetch} />
    </>
  );
}
