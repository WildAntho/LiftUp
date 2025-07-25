import { gql } from "@apollo/client";

export const SELECT_COACH = gql`
  query SelectCoach(
    $id: String!
    $price: [Float!]
    $input: String
    $categorie: String
  ) {
    selectCoach(id: $id, price: $price, input: $input, categorie: $categorie) {
      id
      email
      firstname
      lastname
      roles
      avatar
      coachProfile {
        id
        name
        specialisation
      }
      offers {
        id
        price
        name
        description
        availability
        durability
        category {
          id
          label
        }
      }
    }
  }
`;
