import { gql } from "@apollo/client";

export const GET_TRAINING_PLAN = gql`
  query GetTrainingPlan($data: getTrainingType!) {
    getTrainingPlan(data: $data) {
      id
      title
      dayNumber
      notes
      exercices {
        id
        title
        serie
        rep
        intensity
        weight
        notes
        image
        position
      }
    }
  }
`;
