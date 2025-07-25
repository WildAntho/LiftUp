import Stripe from "stripe";
import { CoachProfile } from "../../entities/coachProfile";

// Handler pour déterminer si le compte coach peut recevoir et retirer des paiements
export async function handleAccountUpdated(account: Stripe.Account) {
  try {
    const coachProfile = await CoachProfile.findOne({
      where: { stripeAccountId: account.id },
    });

    if (!coachProfile) {
      console.warn(
        `[Webhook] Aucun utilisateur trouvé pour le compte Stripe ${account.id}`
      );
      return;
    }

    coachProfile.chargesEnabled = account.charges_enabled;
    coachProfile.payoutsEnabled = account.payouts_enabled;
    coachProfile.detailsSubmitted = account.details_submitted;

    await coachProfile.save();
    console.log(
      `✅ Compte Connect mis à jour pour le profil coach ${coachProfile.id}`
    );
  } catch (err) {
    console.error(`[Webhook] ❌ Erreur dans handleAccountUpdated :`, err);
  }
}
