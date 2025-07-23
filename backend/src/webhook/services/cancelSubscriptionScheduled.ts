import Stripe from "stripe";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../../entities/profileSubscription";
import { Invoice } from "../../entities/invoice";

// Programme l'annulation d'un abonnement différé
export const cancelSubscriptionScheduled = async (
  subscription: Stripe.Subscription
) => {
  const stripeSubscriptionId = subscription.id;

  // Vérifie si l'abonnement est en annulation différée
  if (subscription.cancel_at_period_end) {
    const localSub = await ProfileSubscription.findOne({
      where: { stripeSubscriptionId },
    });

    if (!localSub) {
      console.warn("🔍 Aucune subscription trouvée pour", stripeSubscriptionId);
      return;
    }

    localSub.status = ProfileSubscriptionStatus.SCHEDULE_CANCEL;
    localSub.canceledAt = new Date(); // maintenant
    localSub.endDate = localSub.currentPeriodEnd;

    await localSub.save();

    const lastInvoice = await Invoice.findOne({
      where: { profileSubscription: { id: localSub.id } },
      order: { createdAt: "DESC" },
    });

    if (lastInvoice) {
      lastInvoice.nextPaymentAt = null;
      await lastInvoice.save();
    }

    console.log(
      "✅ Abonnement mis à jour comme 'scheduled_cancel' pour",
      stripeSubscriptionId
    );
  }
};
