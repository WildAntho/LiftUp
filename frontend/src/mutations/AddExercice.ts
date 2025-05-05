import { gql } from "@apollo/client";

export const ADD_EXERCICE = gql`
  mutation AddExercice($exercices: [AddExercicePlanInput!]!, $id: String!, $scope: ScopeExercice!) {
    addExercice(exercices: $exercices, id: $id, scope: $scope)
  }
`;
