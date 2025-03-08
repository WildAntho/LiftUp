import { gql } from "@apollo/client";

export const ADD_TRAINING_STUDENT = gql`
  mutation AddTrainingStudent($data: TrainingData!) {
    addTrainingStudent(data: $data)
  }
`;
