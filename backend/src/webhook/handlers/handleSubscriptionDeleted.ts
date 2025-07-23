import Stripe from "stripe";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../../entities/profileSubscription";
import { User } from "../../entities/user";

export const handleSubscriptionDeleted = async (
  subscription: Stripe.Subscription
) => {
  const stripeSubscriptionId = subscription.id;

  // On récupère la souscription à supprimer
  const localSub = await ProfileSubscription.findOne({
    where: { stripeSubscriptionId },
    relations: ["user", "profile"],
  });

  if (!localSub) {
    console.warn("🔍 Aucune subscription trouvée pour", stripeSubscriptionId);
    return;
  }

  // On récupère l'utilisateur lié à cet abonnement
  const user = await User.findOne({
    where: {
      profileSubscriptions: {
        id: localSub.id,
      },
    },
  });
  if (!user) {
    console.warn(
      "🔍 Aucun utilisateur est affilié à l'abonnement",
      stripeSubscriptionId
    );
    return;
  }

  // Retrait du profil à l'utilisateur
  user.profile = null;
  await user.save();

  // ✅ Mise à jour de la subscription locale
  localSub.status = ProfileSubscriptionStatus.CANCELED;
  localSub.endDate = new Date(); // ou conserve la précédente
  await localSub.save();

  console.log("🚫 Accès au profil retiré pour user:", user.id);
};
