import { stripe } from "../config/stripe";
import Stripe from "stripe";
import { Request, Response } from "express";
import { handleCheckoutSessionCompleted } from "./handlers/handleCheckoutSessionCompleted";
import { handleInvoicePaymentSucceeded } from "./handlers/handleInvoicePaymentSucceeded";
import { handleInvoicePaymentFailed } from "./handlers/handleInvoicePaymentFailed";
import { handleChargeUpdated } from "./handlers/handleChargeUpdated";
import { handleAccountUpdated } from "./handlers/handleAccountUpdated";
import { handleSubscriptionUpdated } from "./handlers/handleSubscriptionUpdated";
import { handleSubscriptionDeleted } from "./handlers/handleSubscriptionDeleted";

export const stripeWebhookHandlerPlateform = async (
  req: Request,
  res: Response
) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_PLATEFORM!
    );
  } catch (err: any) {
    console.error("❌ Signature Stripe invalide :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentSucceeded(invoice);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentFailed(invoice);
      break;
    }
    case "charge.updated": {
      const charge = event.data.object as Stripe.Charge;
      await handleChargeUpdated(charge);
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscription);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }
  }
  res.status(200).json({ received: true });
};

export const stripeWebhookHandlerConnect = async (
  req: Request,
  res: Response
) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_CONNECT!
    );
  } catch (err: any) {
    console.error("❌ Signature Stripe invalide :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  switch (event.type) {
    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      await handleAccountUpdated(account);
      break;
    }
  }
  res.status(200).json({ received: true });
};
