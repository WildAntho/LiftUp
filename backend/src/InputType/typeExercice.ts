import { Field, InputType } from "type-graphql";

@InputType()
export class ExerciceTypeData {
  @Field({ nullable: true })
  id?: string;

  @Field()
  value!: string;

  @Field({ nullable: true })
  label?: string;
}
