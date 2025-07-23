import { gql } from "@apollo/client";

export const GET_PROFILE_ADMIN = gql`
  query GetProfileAdmin {
    getProfileAdmin {
      id
      name
      permissions {
        id
        key
        description
      }
    }
  }
`;
