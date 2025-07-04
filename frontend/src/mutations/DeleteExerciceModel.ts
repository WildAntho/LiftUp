import { gql } from "@apollo/client";

export const DELETE_EXERCICE_MODEL = gql`
  mutation DeleteExerciceModel($id: String!) {
    deleteExerciceModel(id: $id)
  }
`;
