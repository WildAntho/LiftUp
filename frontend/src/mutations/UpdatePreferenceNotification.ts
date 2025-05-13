import { gql } from "@apollo/client";

export const UPDATE_PREFERENCE_NOTIFICATION = gql`
  mutation UpdatePreferenceNotification($data: [NotificationType!]!) {
    updatePreferenceNotification(data: $data)
  }
`;
