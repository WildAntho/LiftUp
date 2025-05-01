import { gql } from "@apollo/client";

export const GET_ALLEXERCICE_MODEL = gql`
  query GetAllExercicesModel($data: ExerciceModelInput) {
    getAllExercicesModel(data: $data) {
      id
      title
      serie
      rep
      intensity
      weight
      notes
      image
      type {
        id
        value
        label
      }
    }
  }
`;
