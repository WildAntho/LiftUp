import Stripe from "stripe";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../../entities/profileSubscription";
import { User } from "../../entities/user";
import { Profile } from "../../entities/profile";
import { stripe } from "../../config/stripe";
import { createConnectAccount } from "./createConnectAccount";

// Service de gestion des permissions lorsque la session de paiement d'un abonnement est validée
export async function handleProfileCheckoutSession(
  session: Stripe.Checkout.Session
) {
  try {
    const profileSubscriptionId = session.metadata?.profileSubscriptionId;

    if (!profileSubscriptionId) {
      console.warn(
        `[Webhook] profileSubscriptionId manquant pour session ${session.id}`
      );
      return;
    }

    const profileSub = await ProfileSubscription.findOne({
      where: { id: profileSubscriptionId },
      relations: {
        user: true,
        profile: true,
      },
    });

    if (!profileSub) {
      console.warn(
        `[Webhook] Aucune souscription trouvée pour ID ${profileSubscriptionId}`
      );
      return;
    }

    if (!session.subscription) {
      console.warn(
        `[Webhook] Aucune subscription Stripe liée à la session ${session.id}`
      );
      return;
    }

    const stripeSubscriptionId = session.subscription as string;

    let stripeSubscription: Stripe.Subscription;
    try {
      stripeSubscription = await stripe.subscriptions.retrieve(
        stripeSubscriptionId
      );
    } catch (err) {
      console.error(
        `[Webhook] Erreur lors de la récupération de la souscription Stripe ${stripeSubscriptionId}`,
        err
      );
      return;
    }

    profileSub.stripeSubscriptionId = stripeSubscriptionId;
    profileSub.status = ProfileSubscriptionStatus.FIRST_PAID;
    profileSub.startDate = new Date(stripeSubscription.start_date * 1000);
    profileSub.updatedAt = new Date();

    await profileSub.save();

    const user = await User.findOneBy({ id: profileSub.user.id });
    const profile = await Profile.findOneBy({ id: profileSub.profile.id });

    if (!user || !profile) {
      console.warn(
        `[Webhook] Utilisateur ou profil introuvable pour subscription ID ${profileSubscriptionId}`
      );
      return;
    }

    await createConnectAccount(user);

    user.profile = profile;
    profileSub.status = ProfileSubscriptionStatus.ACTIVE;

    await Promise.all([user.save(), profileSub.save()]);
  } catch (err) {
    console.error(
      `[Webhook] ❌ Erreur inattendue dans handleProfileCheckoutSession :`,
      err
    );
  }
}
