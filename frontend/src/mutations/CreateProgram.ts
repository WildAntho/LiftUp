import { gql } from "@apollo/client";

export const CREATE_PROGRAM = gql`
  mutation CreateProgram($data: ProgramInput!) {
    createProgram(data: $data) {
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
