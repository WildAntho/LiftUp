import { gql } from "@apollo/client";

export const GET_NEW_NOTIFICATION = gql`
  subscription SubNewNotification($id: String!) {
    newNotification(id: $id) {
      id
      type
      hasBeenSeen
      isRead
      createdAt
      request {
        id
        sender {
          firstname
          lastname
          roles
        }
        receiver {
          firstname
          lastname
        }
      }
      feedback {
        title
        id
        comment
        user {
          id
          firstname
          lastname
          email
          avatar
        }
      }
      membership {
        id
        student {
          id
          email
          firstname
          lastname
          avatar
        }
      }
    }
  }
`;
