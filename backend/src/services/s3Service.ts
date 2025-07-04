import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const PRIVATE_BUCKET_NAME = process.env.S3_PRIVATE_BUCKET_NAME!;
const PUBLIC_BUCKET_NAME = process.env.S3_PUBLIC_BUCKET_NAME!;

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
    : `public/exercices/staging/thumbnail/${fileName}`;

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
    : `public/exercices/staging/thumbnail/${fileName}`;

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
