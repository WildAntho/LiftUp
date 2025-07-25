import InvoiceButton from "../Invoices/InvoiceButton";
import SkeletonButton from "./SkeletonButton";

type IllustrationStripeProps = {
  onConnect: () => void;
  loading: boolean;
  gotStripeAccount?: boolean;
  canSell?: boolean | null;
  canPayout?: boolean | null;
  loadingProfile: boolean;
};

export default function IllustrationStripe({
  onConnect,
  loading,
  gotStripeAccount,
  canSell,
  canPayout,
  loadingProfile,
}: IllustrationStripeProps) {
  const renderTitle = () => {
    if (!gotStripeAccount) return "Crée ton compte Connect";
    if (gotStripeAccount && (!canSell || !canPayout))
      return "Complète ton compte Connect";
    return "Accéder à mon compte Connect";
  };
  return (
    <div className="w-full h-[300px] p-8 font-sans relative">
      {/* Image en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/stripe.webp"
          alt="Illustration"
          className="w-full h-full object-cover rounded-lg opacity-50"
        />
        {/* Gradient overlay pour réduire l'opacité de gauche à droite */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent rounded-lg"></div>
      </div>

      {/* Contenu textuel superposé */}
      <div className="relative z-10 max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenue sur ton espace Stripe
        </h1>
        <h2 className="text-2xl text-purple-500 font-bold mb-4">
          Retrouve toutes les informations concernant les ventes sur Liftup !
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          Complète dès maintenant ton compte Stripe Connect pour pouvoir vendre
          tes programmes.
        </p>
      </div>
      {!loadingProfile ? (
        <InvoiceButton
          onClick={onConnect}
          loading={loading}
          disabled={loading}
          title={renderTitle()}
          color="purple"
        />
      ) : (
        <SkeletonButton />
      )}
    </div>
  );
}
