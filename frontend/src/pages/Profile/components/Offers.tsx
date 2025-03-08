import { useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetMyOffersQuery } from "@/graphql/hooks";
import OfferCard from "@/components/OfferCard";
import OfferModal from "@/components/modals/OfferModal";

export default function Offers() {
  const { data: dataOffers, refetch } = useGetMyOffersQuery();
  const [isShow, setIsShow] = useState<boolean>(true);
  const switchView = () => {
    setIsShow(!isShow);
  };
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => {
    setOpen(false);
  };

  const myOffers = dataOffers?.getCoachOffers ?? [];

  return (
    <>
      <section className="w-full h-full flex flex-col items-start justify-start p-10">
        <HeaderProfile
          isShow={isShow}
          onClick={switchView}
          title="Mes offres"
          tooltip="Modifier ma description"
          withEdit={false}
        />
        <section className="w-full">
          <Button
            type="button"
            className="flex justify-center items-center gap-2 bg-primary hover:bg-blue-600 mt-5"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Ajouter une nouvelle prestation
          </Button>
          <section className="w-[80%] flex flex-col items-start justify-start gap-6 px-2 py-10">
            {myOffers?.map((o) => (
              <div key={o.id} className="w-full">
                <OfferCard offer={o} refetch={refetch} isMyOffer={true} />
              </div>
            ))}
          </section>
        </section>
      </section>
      <OfferModal open={open} onClose={closeModal} refetch={refetch} />
    </>
  );
}
