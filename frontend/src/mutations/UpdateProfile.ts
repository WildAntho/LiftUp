import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: UpdateProfile!) {
    updateProfile(data: $data) {
      id
      email
      firstname
      lastname
      sex
      roles
      avatar
    }
  }
`;
