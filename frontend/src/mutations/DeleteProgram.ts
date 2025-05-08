import { gql } from "@apollo/client";

export const DELETE_PROGRAM = gql`
  mutation DeleteProgram($id: String!) {
    deleteProgram(id: $id)
  }
`;
