import { gql } from "@apollo/client";

export const GET_PROGRAM_MARKETPLACE = gql`
  query GetProgramsMarketPlace {
    getProgramsMarketPlace {
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
