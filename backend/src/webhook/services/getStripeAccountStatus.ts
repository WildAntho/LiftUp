import Stripe from "stripe";

// Service pour déterminer si l'onboarding est bien terminé et que le compte Connect est actif
export function getStripeAccountStatus(account: Stripe.Account) {
    if (!account) return { ready: false, reason: 'no_account' };
  
    if (account.type !== 'express') return { ready: false, reason: 'wrong_type' };
    if (!account.charges_enabled) return { ready: false, reason: 'charges_disabled' };
    if (!account.payouts_enabled) return { ready: false, reason: 'payouts_disabled' };
    if (!account.details_submitted) return { ready: false, reason: 'details_not_submitted' };
    if ((account.requirements?.currently_due || []).length > 0)
      return { ready: false, reason: 'requirements_due' };
    if (account.requirements?.disabled_reason)
      return { ready: false, reason: 'account_disabled' };
  
    return { ready: true };
  }