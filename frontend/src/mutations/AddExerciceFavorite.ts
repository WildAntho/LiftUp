import { gql } from "@apollo/client";

export const ADD_EXERCICE_FAVORITE = gql`
  mutation AddExerciceFavorite($id: String!) {
    addExerciceFavorite(id: $id)
  }
`;
