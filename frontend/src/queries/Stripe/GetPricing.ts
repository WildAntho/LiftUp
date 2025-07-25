import { gql } from "@apollo/client";

export const GET_PROFILE_ADMIN = gql`
  query GetProfilePricing {
    getProfilePricing {
      id
      name
      monthlyAmount
      yearlyAmount
    }
  }
`;
