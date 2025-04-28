import { gql } from "@apollo/client";

export const GET_TRAINING_PLNA = gql`
  query GetTrainingPlan($data: getTrainingType!) {
    getTrainingPlan(data: $data) {
      id
      title
      dayNumber
      notes
    }
  }
`;
