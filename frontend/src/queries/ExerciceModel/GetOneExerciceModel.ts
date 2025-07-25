import { gql } from "@apollo/client";

export const GET_ONE_EXERCICE_MODEL = gql`
  query GetOneExericeModel($id: String!) {
    getOneExericeModel(id: $id) {
      id
      title
      image
      description
      muscles {
        id
      }
    }
  }
`;
