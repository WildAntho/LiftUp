import { gql } from "@apollo/client";

export const GET_FAVORITE_EXERCICE_IDS = gql`
  query GetFavoriteExercicesId {
    getFavoriteExercicesId
  }
`;
