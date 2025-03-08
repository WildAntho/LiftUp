import { gql } from "@apollo/client";

export const UPDATE_TRAINING = gql`
  mutation UpdateTraining($data: UpdateTrainingData!) {
    updateTraining(data: $data)
  }
`;
