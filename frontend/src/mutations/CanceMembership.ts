import { gql } from "@apollo/client";

export const CANCEL_MEMBERSHIP = gql`
  mutation CancelMembership {
    cancelMembership
  }
`;
