import { gql } from "@apollo/client";

export const GET_USERS_ADMIN = gql`
  query GetUsers {
    getUsers {
      id
      email
      firstname
      lastname
      roles
      avatar
      sex
      coach {
        firstname
        lastname
        email
        avatar
        id
      }
      profile {
        id
        name
      }
    }
  }
`;
