import { gql } from "@apollo/client";

export const GET_ALLEXERCICE_MODEL = gql`
  query GetAllExercicesModel($input: String, $id: String, $getFavorite: Boolean) {
    getAllExercicesModel(input: $input, id: $id, getFavorite: $getFavorite) {
      id
      title
      serie
      rep
      intensity
      weight
      notes
      image
      weightFormat
      repFormat
      intensityFormat
      tempo
    }
  }
`;
