import { gql } from "@apollo/client";

export const DUPLICATE_WEEK_TRAINING = gql`
  mutation DuplicateWeekTraining(
    $repetition: Float!
    $currentWeek: Float!
    $programId: String!
  ) {
    duplicateWeekTraining(
      repetition: $repetition
      currentWeek: $currentWeek
      programId: $programId
    )
  }
`;
