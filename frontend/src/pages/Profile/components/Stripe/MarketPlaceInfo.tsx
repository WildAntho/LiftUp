import { Separator } from "@/components/ui/separator";
import { TbCoinEuroFilled } from "react-icons/tb";
import { AlertTriangle } from "lucide-react";
import { Checkbox } from "@heroui/checkbox";
import { Visibility } from "./Stripe";
import { useDebouncedCallback } from "@/services/hooks/useDebouncedCallback";

type MarketPlaceInfoProps = {
  visibility: Visibility;
  onChange: (value: boolean, key: "profileVisible" | "programVisible") => void;
};

export default function MarketPlaceInfo({
  visibility,
  onChange,
}: MarketPlaceInfoProps) {
  const debouncedProfileUpdate = useDebouncedCallback(
    (value: boolean) => {
      onChange(value, "profileVisible");
    },
    1000,
    { leading: true }
  );

  const debouncedProgramUpdate = useDebouncedCallback(
    (value: boolean) => {
      onChange(value, "programVisible");
    },
    1000,
    { leading: true }
  );

  return (
    <div className="flex flex-col items-start justify-start gap-5 w-full p-8 bg-white border shadow-md rounded-2xl">
      {/* Header */}
      <div className="text-start w-full">
        <div className="w-full flex justify-start items-center gap-4">
          <TbCoinEuroFilled size={34} />
          <div>
            <p className="text-xl font-bold">Marketplace</p>
            <p className="text-gray-500 text-sm">
              En quoi consiste le marketplace ?
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <p className="text-sm text-gray-600">
        Le marketplace permet aux sportifs, sans entraîneur, de trouver des
        plans d'entraînement et/ou un entraîneur. Être visible sur la
        marketplace Liftup est inclus dans ton abonnement entraîneur et permet à
        ton contenu d'être visible pour tout sportif cherchant à préparer un
        objectif. Bénéficie de la visibilité qu'offre Liftup sans coût
        supplémentaire.
      </p>
      <div className="flex flex-col items-start justify-center gap-2">
        <p className="text-lg font-semibold">Page entraîneur</p>
        <p className="text-sm text-gray-600">
          C'est cette page qui sera visible par tous les élève à la recherche
          d'un entraîneur. Elle inclut ta description, tes spécialisations, les
          offres de coaching que tu proposes et tous les plans d'entraînements
          que tu as créés.
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <Checkbox
          isSelected={!!visibility.profileVisible}
          onValueChange={debouncedProfileUpdate}
        >
          <p className="text-sm">
            Je veux que des sportifs puissent me contacter pour du coaching
          </p>
        </Checkbox>
        <Checkbox
          isSelected={!!visibility.programVisible}
          onValueChange={debouncedProgramUpdate}
        >
          <p className="text-sm">
            Je veux que mes plans d'entraînements soient visibles sur le
            marketplace
          </p>
        </Checkbox>
      </div>
      <Separator />
      <p className="flex justify-center items-center gap-2 text-red-500 text-xs">
        <AlertTriangle />
        Seuls les paiements concernant les plans d'entraînements sont gérés par
        la plateforme. Pour toutes les offres de suivi de coaching, la partie
        facturation n'est pas disponible pour le moment.
      </p>
    </div>
  );
}
