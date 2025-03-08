import { gql } from "@apollo/client";

export const ADD_FEEDBACK = gql`
  mutation AddFeedback($data: FeedbackData!) {
    addFeedback(data: $data)
  }
`;
