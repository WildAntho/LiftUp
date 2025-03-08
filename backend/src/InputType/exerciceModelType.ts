import { Field, InputType } from "type-graphql";
import { ExerciceTypeData } from "./typeExercice";

@InputType()
export class ExerciceModelData {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  input?: string;
}
