import { gql } from "@apollo/client";

export const GENERATE_UPLOAD_URL = gql`
  mutation GenerateUploadUrl($fileType: String, $fileName: String, $isNew: Boolean) {
    generateUploadUrl(fileType: $fileType, fileName: $fileName, isNew: $isNew) {
      uploadUrl
      fileName
    }
  }
`;
