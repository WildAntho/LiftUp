import Stripe from "stripe";
import { handleProgramCheckoutSession } from "../services/handleProgramCheckoutSession";
import { handleProfileCheckoutSession } from "../services/handleProfileCheckoutSession";

// Handler pour toutes les sessions de paiement réussi -> Redirige vers le bon service
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  if (session.metadata?.programSubscriptionId) {
    await handleProgramCheckoutSession(session);
  }
  if (session.metadata?.profileSubscriptionId) {
    await handleProfileCheckoutSession(session);
  }
}
