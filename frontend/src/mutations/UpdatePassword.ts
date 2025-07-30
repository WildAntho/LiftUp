import { gql } from "@apollo/client";

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data)
  }
`;
