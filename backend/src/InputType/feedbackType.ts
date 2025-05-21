import { Field, InputType } from "type-graphql";

@InputType()
export class FeedbackData {
  @Field()
  trainingId!: string;

  @Field()
  intensity!: number;

  @Field()
  feeling!: number;

  @Field()
  satisfaction!: number;

  @Field()
  comment?: string;
}

export type FeedbackWithoutTrainingIdType = Omit<FeedbackData, "trainingId">;

@InputType()
export class FeedbackWithoutTrainingId
  implements FeedbackWithoutTrainingIdType
{
  @Field()
  intensity!: number;

  @Field()
  feeling!: number;

  @Field()
  satisfaction!: number;

  @Field()
  comment?: string;
}
