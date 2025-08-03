import { gql } from "@apollo/client";

export const GET_EXERCICE_INFO = gql`
  query GetExerciceInfo($id: String!) {
    getExerciceInfo(id: $id) {
      link
      description
      title
      muscles {
        id
        label
      }
      category {
        id
        key
        label
      }
    }
  }
`;
