import { Field, Float, InputType } from "type-graphql";
import { ExerciceTypeData } from "./typeExercice";

@InputType()
class Config {
  @Field({ nullable: true })
  intensity?: number;

  @Field({ nullable: true })
  rep?: number;

  @Field({ nullable: true })
  serie?: number;
}

@InputType()
export class ExerciceData {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title!: string;

  @Field()
  serie!: number;

  @Field()
  rep!: number;

  @Field({ nullable: true })
  intensity?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  type?: ExerciceTypeData;

  @Field({ nullable: true })
  config?: Config;
}
