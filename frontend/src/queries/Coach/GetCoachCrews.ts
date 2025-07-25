import { gql } from "@apollo/client";

export const GET_COACH_CREWS = gql`
  query GetCoachCrews {
    getCoachCrews {
      id
      name
      students {
        id
        email
        firstname
        lastname
        roles
        avatar
      }
    }
  }
`;
