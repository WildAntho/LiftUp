import { gql } from "@apollo/client";

export const DELETE_TRAININ_PLAN = gql`
  mutation DeleteTrainingPlan($id: String!) {
    deleteTrainingPlan(id: $id)
  }
`;
