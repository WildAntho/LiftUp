import { gql } from "@apollo/client";

export const GET_STUDENT_TRAINING = gql`
  query getStudentTrainings($id: String!, $rangeDate: RangeDate!) {
    getStudentTrainings(id: $id, rangeDate: $rangeDate) {
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
        tempo
        repFormat
        weightFormat
        intensityFormat
        notes
        image
        position
      }
    }
  }
`;
