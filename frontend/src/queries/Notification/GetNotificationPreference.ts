import { gql } from "@apollo/client";

export const GET_NOTIFICATION = gql`
  query GetPreferenceNotification {
    getPreferenceNotification {
      id
      disabledTypes
    }
  }
`;
