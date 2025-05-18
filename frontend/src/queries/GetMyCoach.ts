import { gql } from "@apollo/client";

export const GET_MYCOACH = gql`
  query GetMyCoach {
    getMyCoach {
      id
      email
      firstname
      lastname
      avatar
    }
  }
`;
