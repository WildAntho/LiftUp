import { gql } from "@apollo/client";

export const CREATE_CREW = gql`
  mutation CreateCrew($ids: [String!]!, $name: String!) {
    createCrew(ids: $ids, name: $name)
  }
`;
