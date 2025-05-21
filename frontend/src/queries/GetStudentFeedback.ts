import { gql } from "@apollo/client";

export const GET_STUDENT_FEEDBACK = gql`
  query GetStudentFeedback($id: String!, $rangeDate: RangeDate!) {
    getStudentFeedback(id: $id, rangeDate: $rangeDate) {
      id
      title
      intensity
      feeling
      satisfaction
      date
      comment
    }
  }
`;
