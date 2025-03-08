import { gql } from "@apollo/client";

export const REJECT_REQUEST = gql`
  mutation RejectRequest($id: String!) {
    rejectRequest(id: $id)
  }
`;
