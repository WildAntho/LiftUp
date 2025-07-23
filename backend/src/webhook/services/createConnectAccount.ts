import { stripe } from "../../config/stripe";
import { User } from "../../entities/user";
import { UserRole } from "../../InputType/userType";


// Service de création de compte Connect (coach)
export async function createConnectAccount(user: User): Promise<User> {
  const isCoach = user.roles.includes(UserRole.COACH);

  if (!isCoach) {
    console.log(
      `[Stripe] Utilisateur ${user.id} n'est pas coach, aucun compte Connect requis.`
    );
    return user;
  }

  if (!user.coachProfile) {
    console.log(`Aucun profile n'a été renseigné.`);
    return user;
  }

  if (user.stripeCustomerId) {
    console.log(
      `[Stripe] Coach ${user.id} a déjà un compte Connect (${user.coachProfile.stripeAccountId}).`
    );
    return user;
  }

  try {
    const account = await stripe.accounts.create({
      type: "express",
    });

    user.coachProfile.stripeAccountId = account.id;
    user.coachProfile.chargesEnabled = false;
    user.coachProfile.payoutsEnabled = false;

    await user.save();

    console.log(
      `✅ Compte Stripe Connect créé pour le coach ${user.id} (acct: ${account.id})`
    );
  } catch (err) {
    console.error(
      `[Stripe] ❌ Erreur lors de la création du compte Stripe Connect pour le coach ${user.id}`,
      err
    );
  }
  return user;
}
