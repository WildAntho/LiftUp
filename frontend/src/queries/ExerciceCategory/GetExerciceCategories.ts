import { gql } from "@apollo/client";

export const GET_EXERCICE_CATEGORIES = gql`
  query GetExerciceCategories {
    getExerciceCategories {
      id
      key
      label
    }
  }
`;
