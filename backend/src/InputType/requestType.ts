import { Field, InputType } from "type-graphql";

@InputType()
export class AddRequestData {
  @Field()
  receiverId!: string;

  @Field()
  senderId!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  phone?: number;

  @Field({ nullable: true })
  offerId?: string;
}
