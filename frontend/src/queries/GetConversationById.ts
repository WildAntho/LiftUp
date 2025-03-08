import { gql } from "@apollo/client";

export const GET_CONVERSATION_ID = gql`
  query GetConversationById($id: String!) {
    getConversationById(id: $id) {
      id
      messages {
        id
        content
        createdAt
        sender {
          id
        }
        receiver {
          id
        }
      }
    }
  }
`;
