import { gql } from "@apollo/client";

export const GET_ALLEXERCICE_MODEL = gql`
  query GetAllExercicesModel(
    $input: String
    $id: String
    $getFavorite: Boolean
    $muscles: [String!]
    $category: String
  ) {
    getAllExercicesModel(
      input: $input
      id: $id
      getFavorite: $getFavorite
      muscles: $muscles
      category: $category
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
      category {
        id
      }
    }
  }
`;
