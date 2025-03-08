import { gql } from "@apollo/client";

export const DELETE_EXERCICE = gql`
  mutation DeleteExercice($id: String!) {
    deleteExercice(id: $id)
  }
`;
