import { gql } from "@apollo/client";

export const GET_TOTAL_UNREAD_MESSAGE = gql`
  query GetTotalUnreadMessage {
    getTotalUnreadMessage
  }
`;
