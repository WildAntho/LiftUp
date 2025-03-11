import { gql } from "@apollo/client";

export const GET_MYOFFERS = gql`
  query GetMyOffers {
    getCoachOffers {
      id
      name
      price
      description
      availability
      durability
      category {
        label
        id
      }
      crew {
        id
        name
      }
    }
  }
`;
