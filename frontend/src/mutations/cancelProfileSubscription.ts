import { gql } from "@apollo/client";

export const CANCEL_PROFILE_SUBSCRIPTION = gql`
  mutation CancelProfileSubscription {
    cancelProfileSubscription
  }
`;
