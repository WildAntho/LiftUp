import { gql } from "@apollo/client";

export const GET_EXERCICES = gql`
  query GetExercices($id: String!) {
    getExercices(id: $id) {
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
