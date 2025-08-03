import { gql } from "@apollo/client";

export const GET_PROGRAM_MARKETPLACE = gql`
  query GetProgramsMarketPlace(
    $price: [Float!]
    $categorie: String
    $level: ProgramLevel
    $id: String
  ) {
    getProgramsMarketPlace(
      price: $price
      categorie: $categorie
      level: $level
      id: $id
    ) {
      id
      title
      duration
      price
      level
      description
      category {
        id
        label
      }
      coach {
        id
        email
        firstname
        lastname
        avatar
      }
    }
  }
`;
