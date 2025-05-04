import { Field, Float, InputType } from "type-graphql";
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
}
