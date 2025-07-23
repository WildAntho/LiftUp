import { gql } from "@apollo/client";

export const GENERATE_SESSION_PROFILE = gql`
  mutation GenerateSessionProfile($periodicity: Periodicity!, $id: String!) {
    generateSessionProfile(periodicity: $periodicity, id: $id)
  }
`;
