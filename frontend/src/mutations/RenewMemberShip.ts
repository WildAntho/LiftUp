import { gql } from "@apollo/client";

export const RENEW_MEMBERSHIP = gql`
  mutation RenewMemberShip($id: String!) {
    renewMemberShip(id: $id)
  }
`;
