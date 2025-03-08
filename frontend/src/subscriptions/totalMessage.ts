import { gql } from "@apollo/client";

export const GET_NEW_NOTIFICATION = gql`
  subscription totalUnreadMessageSub($id: String!) {
    totalMessage(id: $id)
  }
`;
