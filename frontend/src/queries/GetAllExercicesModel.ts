import { gql } from "@apollo/client";

export const GET_ALLEXERCICE_MODEL = gql`
  query GetAllExercicesModel($input: String, $id: String, $getFavorite: Boolean, $secondary: String, $primary: String) { 
    getAllExercicesModel(input: $input, id: $id, getFavorite: $getFavorite, secondary: $secondary, primary: $primary) {
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
