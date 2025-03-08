import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: userLogin!) {
    login(data: $data)
  }
`;
