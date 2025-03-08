import { Field, InputType } from "type-graphql";
import { ExerciceData } from "./exerciceType";

@InputType()
export class TrainingData {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field(() => [Date])
  date!: Date[];

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  editable!: boolean;

  @Field({ nullable: true })
  color?: string;

  @Field(() => [ExerciceData], { nullable: true })
  exercices?: ExerciceData[];
}

@InputType()
export class UpdateTrainingData {
  @Field()
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  editable?: boolean;

  @Field({ nullable: true })
  color?: string;
}

@InputType()
export class RangeDate {
  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}
