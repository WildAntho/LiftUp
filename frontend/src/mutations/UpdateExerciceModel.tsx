import { gql } from "@apollo/client";

export const UPDATE_EXERCICE_MODEL = gql`
  mutation UpdateExerciceModel(
    $data: ExerciceModelData!
    $deleteVideo: Boolean
    $addVideo: Boolean
  ) {
    updateExerciceModel(
      data: $data
      deleteVideo: $deleteVideo
      addVideo: $addVideo
    )
  }
`;
