import { gql } from "@apollo/client";

export const DELETE_TRAINING = gql`
  mutation DeleteTraining($id: String!) {
    deleteTraining(id: $id)
  }
`;
