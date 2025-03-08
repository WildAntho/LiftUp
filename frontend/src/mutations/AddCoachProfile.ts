import { gql } from "@apollo/client";

export const ADD_COACH_PROFILE = gql`
  mutation AddCoachProfile($data: CoachProfileInput!) {
    addCoachProfile(data: $data)
  }
`;
