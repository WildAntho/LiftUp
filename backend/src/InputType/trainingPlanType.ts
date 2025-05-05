import { Field, Float, InputType } from "type-graphql";
import { IntensityFormat, RepFormat, WeightFormat } from "./exerciceType";

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

@InputType()
export class AddExercicePlanInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  serie?: number;

  @Field({ nullable: true })
  rep?: number;

  @Field({ nullable: true })
  intensity?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  tempo?: string;

  @Field({ nullable: true })
  repFormat?: RepFormat;

  @Field({ nullable: true })
  weightFormat?: WeightFormat;

  @Field({ nullable: true })
  intensityFormat?: IntensityFormat;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  position?: number;
}
