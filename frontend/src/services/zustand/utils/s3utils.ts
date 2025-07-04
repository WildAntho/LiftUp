export const uploadFileToAWS = async (
    uploadUrl: string,
    file: File,
    contentType: string
  ) => {
    return fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
  };