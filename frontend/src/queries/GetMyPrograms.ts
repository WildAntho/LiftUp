import { gql } from "@apollo/client";

export const GET_MY_PROGRAMS = gql`
  query GetMyPrograms($status: String) {
    getPrograms(status: $status) {
      id
      title
      description
      status
      duration
      public
      price
    }
  }
`;
