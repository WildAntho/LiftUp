import { gql } from "@apollo/client";

export const DELETE_FEEDBACK = gql`
  mutation DeleteFeedback($id: String!) {
    deleteFeedback(id: $id)
  }
`;
