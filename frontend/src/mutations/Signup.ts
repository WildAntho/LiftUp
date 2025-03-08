import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($data: UserInput!) {
    signUp(data: $data)
  }
`;
