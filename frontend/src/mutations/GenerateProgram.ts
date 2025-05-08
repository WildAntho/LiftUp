import { gql } from "@apollo/client";

export const GENERATE_PROGRAM = gql`
  mutation GenerateProgram(
    $startDate: DateTimeISO!
    $coachId: String!
    $programId: String!
    $userIds: [String!]!
  ) {
    generateProgram(
      startDate: $startDate
      coachId: $coachId
      programId: $programId
      userIds: $userIds
    )
  }
`;
