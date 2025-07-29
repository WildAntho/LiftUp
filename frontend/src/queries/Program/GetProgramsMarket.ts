import { gql } from "@apollo/client";

export const GET_PROGRAM_MARKETPLACE = gql`
  query GetProgramsMarketPlace(
    $price: [Float!]
    $categorie: String
    $level: ProgramLevel
  ) {
    getProgramsMarketPlace(
      price: $price
      categorie: $categorie
      level: $level
    ) {
      id
      title
      duration
      price
      level
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
