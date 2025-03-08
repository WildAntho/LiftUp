import { gql } from "@apollo/client";

export const ADD_OFFER = gql`
  mutation AddOffer($data: OfferInput!) {
    addOffer(data: $data)
  }
`;
