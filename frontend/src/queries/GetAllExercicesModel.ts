import { gql } from "@apollo/client";

export const GET_ALLEXERCICE_MODEL = gql`
  query GetAllExercicesModel(
    $input: String
    $id: String
    $getFavorite: Boolean
    $muscles: [String!]
  ) {
    getAllExercicesModel(
      input: $input
      id: $id
      getFavorite: $getFavorite
      muscles: $muscles
    ) {
      id
      title
      image
      description
      image
      videoType
      video
      user {
        id
      }
      muscles {
        id
      }
    }
  }
`;
