import { gql } from "@apollo/client";

export const SUBSCRIBE_PROGRAM = gql`
  mutation SubscribeProgram(
    $startDate: DateTimeISO!
    $coachId: String!
    $programId: String!
    $politic: Boolean!
  ) {
    subscribeProgram(
      startDate: $startDate
      coachId: $coachId
      programId: $programId
      politic: $politic
    )
  }
`;
