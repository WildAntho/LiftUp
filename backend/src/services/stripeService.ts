import { stripe } from "../config/stripe";
import { User } from "../entities/user";

export async function checkStripeCustomerId(user: User) {
  if (user.stripeCustomerId) return user.stripeCustomerId;
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { userId: user.id.toString() },
    preferred_locales: ["fr"],
  });
  user.stripeCustomerId = customer.id;
  await user.save();
  return user.stripeCustomerId;
}
