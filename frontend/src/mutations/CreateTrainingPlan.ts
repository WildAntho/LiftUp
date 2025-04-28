import { gql } from "@apollo/client";

export const CREATE_TRAINING_PLAN = gql`
  mutation CreateTrainingPlan($data: TrainingPlanData!) {
    createTrainingPlan(data: $data)
  }
`;
