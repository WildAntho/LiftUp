import { gql } from "@apollo/client";

export const REACTIVATE_PROFILE_SUBSCRIPTION = gql`
  mutation ReactivateProfileSubscription {
    reactivateProfileSubscription
  }
`;
