import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const PRIVATE_BUCKET_NAME = process.env.S3_PRIVATE_BUCKET_NAME!;
const PUBLIC_BUCKET_NAME = process.env.S3_PUBLIC_BUCKET_NAME!;

const targetEnv = process.env.NODE_ENV === "development" ? "staging" : process.env.NODE_ENV;

export async function generateS3SignedUrl({
  fileName,
  fileType,
  userId,
  type,
}: {
  fileName: string;
  fileType?: string;
  userId: string;
  type: "putObject" | "getObject";
}) {
  const isVideo = fileType?.startsWith("video/");
  const bucket = isVideo ? PRIVATE_BUCKET_NAME : PUBLIC_BUCKET_NAME;

  const key = isVideo
    ? `videos/users/${userId}/${fileName}`
    : `public/exercices/${targetEnv}/thumbnail/${fileName}`;

  const params = {
    Bucket: bucket,
    Key: key,
    ...(type === "putObject" ? { ContentType: fileType } : {}),
    Expires: 300,
  };

  const url = await s3.getSignedUrlPromise(type, params);

  return { url, returnFileName: fileName };
}

export async function deleteFileFromS3(
  fileName: string,
  userId: string,
  isVideo: boolean
) {
  const key = isVideo
    ? `videos/users/${userId}/${fileName}`
    : `public/exercices/${targetEnv}/thumbnail/${fileName}`;

  const bucket = isVideo ? PRIVATE_BUCKET_NAME : PUBLIC_BUCKET_NAME;

  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (err) {
    console.error(`Erreur lors de la suppression du fichier : ${err}`);
    throw err;
  }
}

export function getExtensionFromMimeType(fileType: string) {
  switch (fileType) {
    case "image/jpeg":
      return "jpg";
    case "video/mp4":
      return "mp4";
    default:
      return "";
  }
}

export function generateFileName(prefix: string, fileType: string) {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 8);
  const extension = getExtensionFromMimeType(fileType);

  let fileName = `${prefix}_${timestamp}_${randomPart}`;
  if (extension) {
    fileName += `.${extension}`;
  }

  return fileName;
}
