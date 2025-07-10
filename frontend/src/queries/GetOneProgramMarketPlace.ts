import { gql } from "@apollo/client";

export const GET_ONE_PROGRAM_MARKET = gql`
  query GetOneProgramMarketPlace($id: String!) {
    getOneProgramMarketPlace(id: $id) {
      program {
        id
        title
        description
        duration
        price
        level
        category {
          label
          id
        }
        coach {
          id
          email
          firstname
          lastname
          avatar
        }
      }
      trainingsCount
    }
  }
`;
