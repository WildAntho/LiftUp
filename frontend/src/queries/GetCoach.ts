import { gql } from "@apollo/client";

export const GET_COACH = gql`
  query GetCoach($id: String!) {
    getUserById(id: $id) {
      coach {
        id
        email
        firstname
        lastname
        roles
        avatar
      }
    }
  }
`;
