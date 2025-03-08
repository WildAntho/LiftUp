import { gql } from "@apollo/client";

export const GET_COACH_PROFILE = gql`
  query GetOneCoachProfile($id: String!) {
    getOneCoachProfile(id: $id) {
      id
      name
      description
      specialisation
      facebook
      instagram
      linkedin
      user {
        firstname
        lastname
      }
    }
  }
`;
