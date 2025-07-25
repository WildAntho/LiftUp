import { gql } from "@apollo/client";

export const GET_DAYNUMBER_TRAINING = gql`
  query GetDayNumberTraining($programId: String!) {
    getDayNumberTraining(id: $programId)
  }
`;
