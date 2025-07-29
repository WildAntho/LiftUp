import { gql } from "@apollo/client";

export const UPDATE_VISIBILITY = gql`
  mutation UpdateVisibility(
    $programVisible: Boolean
    $profileVisible: Boolean
  ) {
    updateVisibility(
      programVisible: $programVisible
      profileVisible: $profileVisible
    )
  }
`;
