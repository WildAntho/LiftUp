import { gql } from "@apollo/client";

export const GET_MYTRAINING = gql`
  query GetMyTraining($id: String!, $rangeDate: RangeDate!) {
    getTrainingsById(id: $id, rangeDate: $rangeDate) {
      createdByCoach
      id
      title
      date
      notes
      editable
      validate
      color
      crew {
        id
      }
      exercices {
        title
        id
        serie
        rep
        intensity
        weight
        notes
        type {
          id
          value
          label
        }
      }
    }
  }
`;
