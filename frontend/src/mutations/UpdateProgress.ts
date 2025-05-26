import { gql } from "@apollo/client";

export const UPDATE_PROGRESS = gql`
  mutation UpdateProgress($data: progressInput!) {
    updateProgress(data: $data)
  }
`;
