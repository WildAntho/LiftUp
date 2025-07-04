import { Field, InputType } from "type-graphql";

@InputType()
export class TrainingPlanData {
  @Field()
  programId!: string;

  @Field()
  title!: string;

  @Field()
  dayNumber!: number;

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class getTrainingType {
  @Field()
  programId!: string;

  @Field()
  dayNumber!: number;
}
