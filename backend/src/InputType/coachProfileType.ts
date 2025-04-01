import { Field, InputType, Int, ObjectType } from "type-graphql";
import { User } from "../entities/user";

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

@ObjectType()
export class StudentsResponse {
  @Field(() => [User])
  students!: User[];

  @Field(() => Int)
  totalCount!: number;
}
