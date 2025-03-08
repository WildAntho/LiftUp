import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($id: String!, $limit: Float, $cursor: String) {
    getMessages(id: $id, limit: $limit, cursor: $cursor) {
      totalCount
      messages {
        id
        content
        createdAt
        readAt
        repliedMessage {
          id
          content
        }
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
