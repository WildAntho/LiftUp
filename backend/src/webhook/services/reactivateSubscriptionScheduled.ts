import Stripe from "stripe";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../../entities/profileSubscription";
import { Invoice } from "../../entities/invoice";

// Reactive l'abonnement
export const reactivateSubscriptionScheduled = async (
  subscription: Stripe.Subscription
) => {
  const stripeSubscriptionId = subscription.id;

  const localSub = await ProfileSubscription.findOne({
    where: { stripeSubscriptionId },
  });

  if (!localSub) {
    console.warn("🔍 Aucune subscription trouvée pour", stripeSubscriptionId);
    return;
  }

  if (localSub.status === ProfileSubscriptionStatus.ACTIVE) return;

  localSub.status = ProfileSubscriptionStatus.ACTIVE;
  localSub.canceledAt = null;
  localSub.endDate = null;

  await localSub.save();

  const lastInvoice = await Invoice.findOne({
    where: { profileSubscription: { id: localSub.id } },
    order: { createdAt: "DESC" },
  });

  if (lastInvoice) {
    lastInvoice.nextPaymentAt = localSub.currentPeriodEnd;
    await lastInvoice.save();
  }

  console.log("✅ Abonnement réactivé pour", stripeSubscriptionId);
};
