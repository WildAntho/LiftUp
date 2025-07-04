import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { MuscleGroup } from "../entities/muscleGroup";

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
}

@ObjectType()
export class ExerciceInfoResponse {
  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [MuscleGroup], { nullable: true })
  muscles?: MuscleGroup[];

  @Field({ nullable: true })
  title?: string;
}
