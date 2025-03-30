import { Field, InputType } from "type-graphql";

@InputType()
export class ActiveMembershipType {
  @Field()
  studentId!: string;

  @Field()
  offerId!: string;
}