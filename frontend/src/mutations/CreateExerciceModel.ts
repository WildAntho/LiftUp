import { gql } from "@apollo/client";

export const CREATE_EXERCICE_MODEL = gql`
  mutation CreateExerciceModel($data: ExerciceModelData!) {
    createExerciceModel(data: $data)
  }
`;
