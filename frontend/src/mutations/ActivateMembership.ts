import { gql } from "@apollo/client";

export const ACTIVATE_MEMBERSHIP = gql`
  mutation ActivateMemberShip($data: ActiveMembershipType!) {
    activeMembership(data: $data)
  }
`;
