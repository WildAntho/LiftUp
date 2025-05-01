import { Field, Float, InputType } from "type-graphql";
import { ExerciceTypeData } from "./typeExercice";

@InputType()
export class ExerciceModelInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  input?: string;
}

@InputType()
export class ExerciceModelData {
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
  notes?: string;

  @Field({ nullable: true })
  type?: ExerciceTypeData;
}
