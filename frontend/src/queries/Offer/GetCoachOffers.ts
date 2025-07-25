import { gql } from "@apollo/client";

export const GET_COACH_OFFERS = gql`
  query GetOneCoachOffers($id: String!) {
    getOneCoachOffers(id: $id) {
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
    }
  }
`;
