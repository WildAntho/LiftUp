import { gql } from "@apollo/client";

export const UPDATE_COACH_PROFILE = gql`
  mutation UpdateCoachProfile($id: String!, $data: CoachProfileInput!) {
    updateCoachProfile(id: $id, data: $data)
  }
`;
