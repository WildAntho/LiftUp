import { gql } from "@apollo/client";

export const VALIDATE_PROGRAM = gql`
  mutation ValidateProgram($id: String!) {
    publishProgram(id: $id)
  }
`;
