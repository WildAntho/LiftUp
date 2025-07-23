import { Field, InputType } from "type-graphql";
import { Profile } from "../entities/profile";

@InputType()
export class StudentCoach {
  @Field()
  coach_id!: string;

  @Field()
  student_id!: string;
}

export type CtxUser = {
  id: string;
  roles: string[];
  profile: Profile
};
