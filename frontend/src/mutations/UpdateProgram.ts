import { gql } from "@apollo/client";

export const UPDATE_PROGRAM = gql`
  mutation UpdateProgram($id: String!, $data: UpdateProgramInput!) {
    updateProgram(id: $id, data: $data)
  }
`;
