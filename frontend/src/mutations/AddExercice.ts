import { gql } from "@apollo/client";

export const ADD_EXERCICE = gql`
  mutation AddExercice($data: ExerciceData!, $id: String!) {
    addExercice(data: $data, id: $id) {
      id
      title
      serie
      intensity
      rep
      weight
    }
  }
`;
