import OfferCard from "@/components/OfferCard";
import { Separator } from "@/components/ui/separator";
import { Offer } from "@/graphql/hooks";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

type OffersCoachProps = {
  offers: Offer[];
};

export default function OffersCoach({ offers }: OffersCoachProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-5 mt-5">
      <div className="w-full">
        <p className="font-semibold text-lg mb-4 flex items-center gap-3">
          <RiMoneyEuroCircleFill size={28} />
          Prestations proposées
        </p>
        <Separator />
      </div>
      <section className="w-full">
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          {offers?.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </section>
  );
}
