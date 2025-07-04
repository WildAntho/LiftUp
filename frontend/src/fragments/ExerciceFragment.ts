import { gql } from "@apollo/client";

export const EXERCICE_FIELDS_FRAGMENT = gql`
  fragment ExerciceFields on Exercice {
    id
    title
    serie
    rep
    intensity
    weight
    tempo
    repFormat
    weightFormat
    intensityFormat
    notes
    position
    exerciceModel {
      id
      image
      title
    }
  }
`;
