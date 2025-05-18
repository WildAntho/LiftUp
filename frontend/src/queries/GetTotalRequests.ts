import { gql } from "@apollo/client";

export const GET_TOTAL_REQUESTS = gql`
  query GetTotalRequests {
    getTotalRequests
  }
`;
