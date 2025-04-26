import { gql } from "@apollo/client";

export const CREATE_PROGRAM = gql`
  mutation CreateProgram($data: ProgramInput!) {
    createProgram(data: $data) {
      id
      duration
      title
    }
  }
`;
