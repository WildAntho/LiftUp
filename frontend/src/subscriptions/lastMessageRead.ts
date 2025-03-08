import { gql } from "@apollo/client";

export const LAST_MESSAGE_READ = gql`
  subscription LastMessageRead($id: String) {
    lastMessageRead(id: $id)
  }
`;
