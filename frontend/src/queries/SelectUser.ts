import { gql } from "@apollo/client";

export const SELECT_USER = gql`
  query SelectUsers($id: String!, $input: String) {
    selectUsers(id: $id, input: $input) {
      id
      email
      firstname
      lastname
      roles
      avatar
    }
  }
`;
