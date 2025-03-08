import { gql } from "@apollo/client";

export const GET_REQUEST = gql`
  query GetRequest($id: String!) {
    getRequest(id: $id) {
      id
      description
      phone
      offer {
        name
        id
      }
      sender {
        id
        email
        firstname
        lastname
        roles
        avatar
      }
    }
  }
`;
