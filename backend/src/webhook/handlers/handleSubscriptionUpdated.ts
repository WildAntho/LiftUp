import Stripe from "stripe";
import { cancelSubscriptionScheduled } from "../services/cancelSubscriptionScheduled";
import { reactivateSubscriptionScheduled } from "../services/reactivateSubscriptionScheduled";

// Ecoute les mises à jour de l'abonnement
// 1) Demande d'annulation différée
// 2) Demande de réactivation avant date effective
export const handleSubscriptionUpdated = async (
  subscription: Stripe.Subscription
) => {
  if (subscription.cancel_at_period_end) {
    await cancelSubscriptionScheduled(subscription);
  }
  if (!subscription.cancel_at_period_end) {
    await reactivateSubscriptionScheduled(subscription);
  }
};
