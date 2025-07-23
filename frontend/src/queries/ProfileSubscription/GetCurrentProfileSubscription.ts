import { gql } from "@apollo/client";

export const GET_CURRENT_PROFILE_SUBSCRIPTION = gql`
  query GetCurrentProfileSubscription {
    getCurrentProfileSubscription {
      id
      status
      currentPeriodEnd
    }
  }
`;
