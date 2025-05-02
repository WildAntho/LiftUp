import { gql } from "@apollo/client";

export const UPDATE_EXERCICE = gql`
  mutation UpdateExercice($data: ExerciceData!, $id: String!) {
    updateExercice(data: $data, id: $id) {
      id
      title
      serie
      intensity
      rep
      weight
    }
  }
`;
