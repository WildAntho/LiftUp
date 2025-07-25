import { gql } from "@apollo/client";

export const GET_PERMISSION_ADMIN = gql`
  query GetPermissionAdmin {
    getPermissionAdmin {
      id
      key
      description
    }
  }
`;
