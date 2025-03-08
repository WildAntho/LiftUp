import { gql } from "@apollo/client";

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($data: StudentCoach!) {
    deleteStudent(data: $data)
  }
`;
