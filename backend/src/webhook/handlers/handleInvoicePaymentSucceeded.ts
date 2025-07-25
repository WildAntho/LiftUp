import Stripe from "stripe";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../../entities/profileSubscription";
import {
  Invoice as InvoiceEntity,
  InvoiceStatus,
} from "../../entities/invoice";

// Handler pour créer une facture liée à un abonnement + maj de l'abonnement local
export async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const profileSubscriptionId =
    invoice.parent?.subscription_details?.metadata &&
    invoice.parent?.subscription_details?.metadata.profileSubscriptionId;

  if (!profileSubscriptionId) {
    console.warn("⚠️ Aucune souscription profile n'a été fourni");
    return;
  }

  if (!invoice.parent?.subscription_details?.subscription) {
    console.warn("⚠️ Invoice sans subscription. Ignorée.");
    return;
  }

  const stripeSubscriptionId = invoice.parent?.subscription_details
    ?.subscription as string;

  // ✅ Retrouve la souscription locale
  const profileSub = await ProfileSubscription.findOne({
    where: { id: profileSubscriptionId },
    relations: ["user"],
  });

  if (!profileSub) {
    console.warn(
      `⚠️ Aucune ProfileSubscription trouvée pour ${stripeSubscriptionId}`
    );
    return;
  }

  const product = invoice.lines.data[0]

  profileSub.status = ProfileSubscriptionStatus.ACTIVE;
  profileSub.currentPeriodEnd = new Date(product.period.end * 1000);
  await profileSub.save();

  // ✅ Crée l'Invoice locale
  const newInvoice = InvoiceEntity.create({
    stripeInvoiceId: invoice.id,
    status: InvoiceStatus.PAID,
    amountPaid: invoice.amount_paid ? invoice.amount_paid / 100 : 0,
    currency: invoice.currency,
    invoicePdf: invoice.invoice_pdf || "", // fallback propre
    hostedInvoicePdf: invoice.hosted_invoice_url || "",
    paidAt: product.period.start
      ? new Date(product.period.start * 1000)
      : new Date(),
    nextPaymentAt: product.period.end
      ? new Date(product.period.end * 1000)
      : undefined,
    user: profileSub.user,
    profileSubscription: profileSub,
  });

  await newInvoice.save();
}
