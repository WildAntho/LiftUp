import { gql } from "@apollo/client";

export const UPDATE_OFFER = gql`
  mutation UpdateOffer($id: String!, $data: OfferInput!) {
    updateOffer(id: $id, data: $data)
  }
`;
