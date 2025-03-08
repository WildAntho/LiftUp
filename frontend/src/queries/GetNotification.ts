import { gql } from "@apollo/client";

export const GET_NOTIFICATION = gql`
  query GetNotification {
    getNotification {
      id
      type
      isRead
      hasBeenSeen
      createdAt
      request {
        sender {
          firstname
          lastname
          roles
          avatar
        }
        receiver {
          firstname
          lastname
          avatar
        }
      }
    }
  }
`;
