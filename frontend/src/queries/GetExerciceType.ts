import { gql } from "@apollo/client";

export const GET_EXERCICE_TYPES = gql`
  query GetExerciceTypes {
    getExerciceTypes {
      id
      value
      label
    }
  }
`;
