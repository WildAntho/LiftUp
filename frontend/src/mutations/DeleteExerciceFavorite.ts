import { gql } from "@apollo/client";

export const DELETE_EXERCICE_FAVORITE = gql`
  mutation DeleteExerciceFavorite($id: String!) {
    deleteExerciceFavorite(id: $id)
  }
`;
