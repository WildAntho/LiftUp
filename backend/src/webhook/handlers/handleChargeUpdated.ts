import Stripe from "stripe";
import { UserProgram } from "../../entities/userProgram";

// Handler pour attacher à une souscription de programme son reçu de paiement
export async function handleChargeUpdated(charge: Stripe.Charge) {
  const programSubscriptionId = charge.metadata?.programSubscriptionId;
  if (!programSubscriptionId) {
    console.warn(
      `[Webhook] programSubscriptionId manquant pour session ${charge.id}`
    );
    return;
  }
  const subscription = await UserProgram.findOne({
    where: { id: programSubscriptionId },
    relations: ["user", "program", "coach"],
  });

  if (!subscription) {
    console.warn(
      `[Webhook] Aucune souscription UserProgram trouvée pour ID ${programSubscriptionId}`
    );
    return;
  }

  if (charge.receipt_url) {
    subscription.receip = charge.receipt_url;
    await subscription.save();
  }
}
