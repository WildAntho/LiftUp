import { Field, InputType } from "type-graphql";

@InputType()
export class StudentCoach {
  @Field()
  coach_id!: string;

  @Field()
  student_id!: string;
}

export type CtxUser = {
  id: string;
  roles: string;
};
