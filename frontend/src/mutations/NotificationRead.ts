import { gql } from "@apollo/client";

export const NOTIFICATION_READ = gql`
  mutation IsRead($ids: [String!]!) {
    isRead(id: $ids)
  }
`;
