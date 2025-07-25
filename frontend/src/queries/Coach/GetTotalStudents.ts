import { gql } from "@apollo/client";

export const GET_TOTAL_STUDENTS = gql`
  query GetTotalStudents {
    getTotalStudents
  }
`;
