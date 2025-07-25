import { InvoiceStatus } from "../entities/invoice";

export function mapStripeStatus(status: string): InvoiceStatus {
    switch (status) {
      case "paid":
        return InvoiceStatus.PAID;
      case "open":
        return InvoiceStatus.OPEN;
      case "uncollectible":
        return InvoiceStatus.UNCOLLECTIBLE;
      case "void":
        return InvoiceStatus.VOID;
      default:
        throw new Error(`Unknown invoice status: ${status}`);
    }
  }