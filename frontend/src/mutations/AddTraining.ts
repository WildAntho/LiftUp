import { gql } from "@apollo/client";

export const ADD_TRAINING = gql`
  mutation AddTraining($data: TrainingData!) {
    addTraining(data: $data)
  }
`;
