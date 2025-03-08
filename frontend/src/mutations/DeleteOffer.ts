import { gql } from "@apollo/client";

export const DELETE_OFFER = gql`
  mutation DeleteOffer($id: String!) {
    deleteOffer(id: $id)
  }
`;
