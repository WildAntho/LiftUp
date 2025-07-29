import { gql } from "@apollo/client";

export const GET_PROGRESS = gql`
  query GetProgress {
    getProgress {
      id
      profile
      training
      program
      offer
      searchCoach
      searchProgram
      createConnect
    }
  }
`;
