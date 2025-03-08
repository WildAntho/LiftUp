import { gql } from "@apollo/client";

export const GET_LIST_USERS_CREW = gql`
  query GetListUsersCrew($input: String) {
    getListUsersCrew(input: $input) {
      id
      email
      firstname
      lastname
      roles
      avatar
    }
  }
`;
