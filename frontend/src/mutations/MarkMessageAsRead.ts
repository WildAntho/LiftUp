import { gql } from "@apollo/client";

export const MARK_AS_READ = gql`
  mutation MarkAsRead($id: String!) {
    markAsRead(id: $id) {
      message
    }
  }
`;
