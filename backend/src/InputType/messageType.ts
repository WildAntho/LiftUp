import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Message } from "../entities/message";

@InputType()
export class AddMessagetData {
  @Field()
  receiverId!: string;

  @Field()
  senderId!: string;

  @Field()
  content!: string;

  @Field()
  isNew!: boolean;

  @Field({ nullable: true })
  conversationId?: string;

  @Field({ nullable: true })
  repliedMessageId?: string;
}

@ObjectType()
export class MarkAsReadResponse {
  @Field()
  message!: string;
}

@ObjectType()
export class MessageResult {
  @Field(() => [Message])
  messages!: Message[];

  @Field(() => Int)
  totalCount!: number;
}
