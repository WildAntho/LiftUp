import { gql } from "@apollo/client";

export const ADD_EXERCICE_PROGRAM = gql`
  mutation AddExerciceProgram(
    $exercices: [AddExercicePlanInput!]!
    $trainingId: String!
  ) {
    addExerciceToProgram(exercices: $exercices, id: $trainingId)
  }
`;
