import { gql } from "@apollo/client";

export const ADD_EXERCICE = gql`
  mutation AddExercice($exercices: [AddExercicePlanInput!]!, $id: String!) {
    addExercice(exercices: $exercices, id: $id)
  }
`;
