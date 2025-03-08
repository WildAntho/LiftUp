import { gql } from "@apollo/client";

export const ADD_TRAINING_CREW = gql`
  mutation AddTrainingCrew($data: TrainingData!) {
    addTrainingCrew(data: $data)
  }
`;
