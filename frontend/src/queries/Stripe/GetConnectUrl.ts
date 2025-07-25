import { gql } from "@apollo/client";

export const GET_CONNECT_URL = gql`
  query GetConnectUrl {
    getConnectUrl
  }
`;
