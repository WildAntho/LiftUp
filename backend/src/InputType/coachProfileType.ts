import { Field, InputType } from "type-graphql";

@InputType()
export class CoachProfileInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  specialisation?: string[];

  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  linkedin?: string;
}
