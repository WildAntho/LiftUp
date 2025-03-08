import { gql } from "@apollo/client";

export const ADD_REQUEST = gql`
  mutation AddRequest($data: AddRequestData!) {
    addRequest(data: $data)
  }
`;
