import { gql } from "@apollo/client";

export const ADD_EXERCICE = gql`
  mutation AddExercice($exercices: [ExerciceData!]!, $id: String!, $scope: ScopeExercice!) {
    addExercice(exercices: $exercices, id: $id, scope: $scope)
  }
`;
