import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { ExerciceModel } from "../entities/exerciceModel";
import { CtxUser } from "../InputType/coachType";
import { generateFileName, generateS3SignedUrl } from "../services/s3Service";

@ObjectType()
export class GenerateUploadURL {
  @Field()
  uploadUrl!: string;

  @Field()
  fileName!: string;
}

@Resolver(ExerciceModel)
export class S3Resolver {
  @Mutation(() => GenerateUploadURL)
  async generateUploadUrl(
    @Ctx() context: { user: CtxUser },
    @Arg("fileName", { nullable: true }) fileName?: string,
    @Arg("fileType", { nullable: true }) fileType?: string,
    @Arg("isNew", { nullable: true }) isNew?: boolean
  ) {
    if (!fileName || !fileType) {
      throw new Error("fileName and fileType are required");
    }

    const uniqueFileName = isNew ? generateFileName("AWS", fileType) : fileName;

    const { url, returnFileName } = await generateS3SignedUrl({
      fileName: uniqueFileName,
      fileType,
      userId: context.user.id,
      type: "putObject",
    });

    return {
      uploadUrl: url,
      fileName: returnFileName,
    };
  }
}
