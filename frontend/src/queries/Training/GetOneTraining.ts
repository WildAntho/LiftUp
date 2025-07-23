import { gql } from "@apollo/client";

export const GET_ONETRAINING = gql`
  query GetOneTraining($id: String!) {
    getOneTraining(id: $id) {
      id
      title
      date
      notes
      createdByCoach
      editable
      validate
    }
  }
`;
