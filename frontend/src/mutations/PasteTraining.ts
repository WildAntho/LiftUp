import { gql } from "@apollo/client";

export const PASTE_TRAINING = gql`
  mutation PasteTraining($day: Float!, $ids: [String!]!) {
    pasteTraining(day: $day, ids: $ids)
  }
`;
