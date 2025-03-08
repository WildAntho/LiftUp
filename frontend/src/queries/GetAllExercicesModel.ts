import { gql } from "@apollo/client";

export const GET_ALLEXERCICE_MODEL = gql`
  query GetAllExercicesModel($data: ExerciceModelData) {
    getAllExercicesModel(data: $data) {
      id
      title
      serie
      rep
      intensity
      weight
      notes
      type {
        id
        value
        label
      }
    }
  }
`;
