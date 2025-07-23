import { gql } from "@apollo/client";

export const GET_INVOICES = gql`
  query GetInvoices {
    getInvoices {
      id
      status
      amountPaid
      currency
      invoicePdf
      hostedInvoicePdf
      paidAt
      nextPaymentAt
      profileSubscription {
        profile {
          id
          name
        }
      }
    }
  }
`;
