import {
  Args,
  ArgsType,
  Ctx,
  Field,
  Int,
  ObjectType,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { IsNull } from "typeorm";

// @ObjectType()
// class TypingStatus {
//   @Field()
//   user!: User;

//   @Field()
//   isTyping!: boolean;
// }

// @ArgsType()
// class TypingArgs {
//   @Field()
//   id!: string;
// }

@ArgsType()
class MessageArgs {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  userId?: string;
}

@Resolver(Message)
export class MessageSusbscription {
  @Subscription(() => Message, {
    topics: ["NEW_MESSAGE"],
    filter: ({ payload, args }) => {
      if (payload.topic === "NEW_MESSAGE" && !args.userId) {
        return (
          payload.newMessage.conversation.id.toString() === args.id.toString()
        );
      }
      if (payload.topic === "NEW_MESSAGE" && args.userId) {
        return (
          payload.newMessage.receiver.id.toString() === args.userId.toString()
        );
      }
      return false;
    },
  })
  newMessage(
    @Root()
    payload: {
      newMessage: Message;
      topic: string;
    },
    @Args() args: MessageArgs
  ): Message {
    return payload.newMessage;
  }

  @Subscription(() => Int, {
    topics: ["NEW_MESSAGE", "MESSAGES_READ"],
    filter: ({ payload, args }) => {
      if (payload.topic === "NEW_MESSAGE") {
        return payload.newMessage.receiver.id.toString() === args.id.toString();
      }
      if (payload.topic === "MESSAGES_READ") {
        return payload.user.toString() === args.id.toString();
      }
      return false;
    },
  })
  async totalMessage(@Args() args: MessageArgs): Promise<number> {
    const unreadMessages = await Message.find({
      where: {
        readAt: IsNull(),
        receiver: { id: args.id },
      },
      relations: {
        receiver: true,
      },
    });
    return unreadMessages.length;
  }

  @Subscription(() => String, {
    topics: ["MESSAGES_READ"],
    filter: ({ payload, args }) => {
      if (payload.topic === "MESSAGES_READ") {
        return payload.conversationId.toString() === args.id.toString();
      }
      return false;
    },
  })
  async lastMessageRead(
    @Root()
    payload: {
      conversationId: string;
      user: string;
      lastMessageId: string;
    },
    @Args() args: MessageArgs
  ) {
    return payload.lastMessageId;
  }

  // @Subscription(() => TypingStatus, {
  //   topics: ["USER_TYPING", "USER_STOP_TYPING"],
  //   filter: ({ payload, args }) => {
  //     return payload.conversationId === args.id;
  //   },
  // })
  // typingStatus(
  //   @Root()
  //   payload: {
  //     user: User;
  //     isTyping: boolean;
  //     topic: string;
  //   },
  //   @Args() args: TypingArgs
  // ): TypingStatus {
  //   return {
  //     user: payload.user,
  //     isTyping: payload.isTyping,
  //   };
  // }
}
