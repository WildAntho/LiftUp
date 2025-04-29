import { gql } from "@apollo/client";

export const UPDATE_TRAINING_PLAN = gql`
  mutation UpdateTrainingPlan($title: String!, $id: String!, $notes: String) {
    updateTrainingPlan(title: $title, id: $id, notes: $notes)
  }
`;
