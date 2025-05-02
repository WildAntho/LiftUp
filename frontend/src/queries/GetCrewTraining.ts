import { gql } from "@apollo/client";

export const GET_CREW_TRAINING = gql`
  query GetCrewTraining($id: String!, $rangeDate: RangeDate!) {
    getCrewTraining(id: $id, rangeDate: $rangeDate) {
      id
      title
      date
      notes
      createdByCoach
      editable
      validate
      color
      exercices {
        title
        id
        serie
        rep
        intensity
        weight
        notes
        image
        position
      }
    }
  }
`;
