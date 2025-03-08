import { gql } from "@apollo/client";

export const NOTIFICATION_SEEN = gql`
  mutation hasBeenseen($ids: [String!]!) {
    hasBeenSeen(id: $ids)
  }
`;
