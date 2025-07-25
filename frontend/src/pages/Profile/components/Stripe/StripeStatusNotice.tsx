import { AlertTriangle } from "lucide-react";

type StripeStatusNoticeProps = {
  canSell?: boolean | null;
  canPayout?: boolean | null;
  onboardingComplete?: boolean | null;
};

export default function StripeStatusNotice({
  canSell,
  canPayout,
  onboardingComplete,
}: StripeStatusNoticeProps) {
  if (canSell && canPayout) return null; // ✅ Tout est OK, pas besoin d'afficher quoi que ce soit

  return (
    <div className="space-y-2">
      {!canSell && (
        <div className="bg-red-50 p-4 rounded-lg flex items-center justify-start gap-4 text-red-600">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-semibold text-sm">
              Tu ne peux pas encore vendre !
            </p>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <span>
                Configure ton compte Stripe Connect pour commencer à vendre tes
                programmes.
              </span>
            </div>
          </div>
        </div>
      )}

      {!canPayout && (
        <div className="bg-yellow-50 p-4 rounded-lg flex items-center justify-start gap-4 text-yellow-600">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-semibold text-sm">
              Tu ne peux pas encore retirer tes gains !
            </p>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <span>
                Ajoute un compte bancaire dans Stripe pour recevoir tes
                paiements.
              </span>
            </div>
          </div>
        </div>
      )}

      {canPayout && canSell && !onboardingComplete && (
        <div className="bg-green-50 p-4 rounded-lg flex items-center justify-start gap-4 text-green-600">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-semibold text-sm">
              Des informations sont manquantes !
            </p>
            <div className="flex items-center space-x-2 mt-1 text-xs">
              <span>
                Ton onboarding n'est pas encore complet, quelques informations
                sont encore manquantes
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
