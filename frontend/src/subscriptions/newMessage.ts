import { gql } from "@apollo/client";

export const GET_NEW_MESSAGE = gql`
  subscription NewMessage($id: String, $userId: String) {
    newMessage(id: $id, userId: $userId) {
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
        avatar
        firstname
        lastname
      }
      receiver {
        id
      }
    }
  }
`;
