import { UserRole } from "@/graphql/hooks";
import { useRole } from "@/services/hooks/useRole";
import InvoiceButton from "./InvoiceButton";

type IllustrationComponentProps = {
  onStripe: () => void;
  loading: boolean;
};

export default function IllustrationComponent({
  onStripe,
  loading,
}: IllustrationComponentProps) {
  const isCoach = useRole(UserRole.Coach);
  return (
    <div className="p-8 h-[300px] font-sans relative">
      {/* Image en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/facturation.webp"
          alt="Illustration"
          className="w-full h-full object-cover rounded-lg opacity-70"
        />
      </div>

      {/* Contenu textuel superposé */}
      <div className="relative z-10 max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenue sur ton espace Client
        </h1>
        <h2 className="text-2xl text-tertiary font-bold mb-4">
          Retrouve toutes les informations concernant ton compte !
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          {`Tu y retrouveras toutes tes factures liées à ton abonnement ainsi que tous tes reçus liés ${
            isCoach
              ? "aux programmes que tu as vendu."
              : "aux programes auxquels tu as souscrit."
          }`}
        </p>
      </div>
      <InvoiceButton
        onClick={onStripe}
        title="Accèder à mon portail client"
        disabled={loading}
        loading={loading}
      />
    </div>
  );
}
