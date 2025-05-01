import { Field, Float, InputType } from "type-graphql";
import { ExerciceTypeData } from "./typeExercice";

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
  notes?: string;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  type?: ExerciceTypeData;
}
