import { gql } from "@apollo/client";

export const GET_CHAT_USER = gql`
  query GetChatUsers {
    getChatUsers {
      firstname
      id
      email
      lastname
      avatar
      roles
    }
  }
`;
