import { gql } from "@apollo/client";

export const UPDATE_STUDENT = gql`
  mutation UpdateFeedback($id: String!, $data: FeedbackWithoutTrainingId!) {
    updateFeedback(id: $id, data: $data)
  }
`;
