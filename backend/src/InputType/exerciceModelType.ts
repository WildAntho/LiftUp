import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { MuscleGroup } from "../entities/muscleGroup";
import { ExerciceCategory } from "../entities/exerciceCategory";

export enum VideoType {
  YOUTUBE = "YOUTUBE",
  PERSO = "PERSO",
}

registerEnumType(VideoType, {
  name: "VideoType",
  description: "Type de vidéo",
});

@InputType()
export class ExerciceModelData {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => VideoType, { nullable: true })
  videoType?: VideoType;

  @Field({ nullable: true })
  video?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => [String], { nullable: true })
  muscles?: string[];

  @Field(() => String, { nullable: true })
  category?: string;
}

@ObjectType()
export class ExerciceInfoResponse {
  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [MuscleGroup], { nullable: true })
  muscles?: MuscleGroup[];

  @Field(() => ExerciceCategory, { nullable: true })
  category?: ExerciceCategory;

  @Field({ nullable: true })
  title?: string;
}
