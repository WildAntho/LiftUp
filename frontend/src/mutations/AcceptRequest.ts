import { gql } from "@apollo/client";

export const ACCEPT_REQUEST = gql`
  mutation AcceptRequest($id: String!, $data: AddRequestData!) {
    acceptRequest(id: $id, data: $data)
  }
`;
