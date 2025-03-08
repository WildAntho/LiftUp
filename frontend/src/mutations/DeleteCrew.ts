import { gql } from "@apollo/client";

export const DELETE_CREW = gql`
  mutation DeleteCrew($id: String!) {
    deleteCrew(id: $id)
  }
`;
