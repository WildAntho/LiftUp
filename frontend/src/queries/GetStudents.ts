import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query getStudents(
    $input: String
    $id: String!
    $crewId: String
    $offerId: String
    $sortRemaining: Boolean
  ) {
    getStudents(
      input: $input
      id: $id
      crewId: $crewId
      offerId: $offerId
      sortRemaining: $sortRemaining
    ) {
      students {
        email
        firstname
        lastname
        roles
        id
        avatar
        studentOffer {
          name
          id
        }
        crew {
          id
          name
        }
        memberships {
          id
          endDate
          isActive
        }
      }
    }
  }
`;
