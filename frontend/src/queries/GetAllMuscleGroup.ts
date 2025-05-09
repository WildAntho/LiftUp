import { gql } from "@apollo/client";

export const GET_ALL_MUSCLE_GROUP = gql`
  query GetAllMuscleGroup {
    getAllMuscleGroup {
      id
      key
      label
    }
  }
`;
