import { EXERCICE_FIELDS_FRAGMENT } from "@/fragments/ExerciceFragment";
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
        position
        exerciceModel {
          id
          image
          title
        }
      }
    }
  }
  ${EXERCICE_FIELDS_FRAGMENT}
`;
