import { gql } from "@apollo/client";

export const GET_MYMEMBERSHIP = gql`
  query GetMyMembership {
    getMembership {
      id
      startDate
      endDate
      isActive
      offer {
        id
        name
        description
      }
    }
  }
`;
