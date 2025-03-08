import { gql } from "@apollo/client";

export const GET_MYPROFILE = gql`
  query GetMyProfile {
    getCoachProfile {
      id
      name
      description
      specialisation
      instagram
      linkedin
      facebook
    }
  }
`;
