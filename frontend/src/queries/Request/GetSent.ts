import { gql } from "@apollo/client";

export const GET_SENT = gql`
  query GetSent($id: String!) {
    getSent(id: $id) {
      receiver {
        email
        id
        firstname
        lastname
        roles
        avatar
      }
    }
  }
`;
