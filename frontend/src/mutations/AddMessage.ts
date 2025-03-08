import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation AddMessage($data: AddMessagetData!) {
    addMessages(data: $data)
  }
`;
