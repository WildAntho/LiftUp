import { gql } from "@apollo/client";

export const ARCHIVE_PROGRAM = gql`
  mutation ArchiveProgram($id: String!) {
    archiveProgram(id: $id)
  }
`;
