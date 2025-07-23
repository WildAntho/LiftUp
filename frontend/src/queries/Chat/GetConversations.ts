import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
      id
      participants {
        id
        firstname
        lastname
        avatar
      }
      messages {
        content
        createdAt
        readAt
        sender {
          id
        }
      }
    }
  }
`;
