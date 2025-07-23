import { gql } from "@apollo/client";

export const GET_NOTIFICATION = gql`
  query GetNotification($unread: Boolean!, $group: String) {
    getNotification(unread: $unread, group: $group) {
      totalUnread
      total
      notifications {
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
  }
`;
