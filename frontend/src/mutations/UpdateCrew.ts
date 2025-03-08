import { gql } from "@apollo/client";

export const UPDATE_CREW = gql`
  mutation UpdateCrew(
    $name: String!
    $studentIds: [String!]!
    $crewId: String!
  ) {
    updateCrew(name: $name, studentIds: $studentIds, id: $crewId)
  }
`;
