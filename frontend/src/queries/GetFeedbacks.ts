import { gql } from "@apollo/client";

export const GET_FEEDBACKS = gql`
  query GetFeedbacks($id: String!, $rangeDate: RangeDate!) {
    getFeedbacks(id: $id, rangeDate: $rangeDate) {
      id
      intensity
      feeling
      comment
      title
      date
    }
  }
`;
