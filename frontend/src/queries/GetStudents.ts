import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query getStudents(
    $input: String
    $id: String!
    $crewId: String
    $offerId: String
    $sortRemaining: Boolean
    $status: String
    $page: Float
    $limit: Float
  ) {
    getStudents(
      input: $input
      id: $id
      crewId: $crewId
      offerId: $offerId
      sortRemaining: $sortRemaining
      status: $status
      page: $page
      limit: $limit
    ) {
      totalCount
      students {
        email
        firstname
        lastname
        roles
        id
        avatar
        studentOffer {
          name
          durability
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
