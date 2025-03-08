import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Conversation } from "../entities/conversation";
import { User } from "../entities/user";
import { In } from "typeorm";
import { CtxUser } from "../InputType/coachType";
import { dataSource } from "../config/db";

@Resolver(Conversation)
export class ConversationResolver {
  @Query(() => [Conversation])
  async getConversations(
    @Ctx() context: { user: CtxUser }
  ): Promise<Conversation[]> {
    const userId = context.user.id;
    const conversations = await dataSource
      .getRepository(Conversation)
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.participants", "participant") // Charge TOUS les participants
      .leftJoinAndSelect("conversation.messages", "message")
      .leftJoinAndSelect("message.sender", "sender")
      .innerJoin("conversation.participants", "user", "user.id = :userId", {
        userId,
      })
      .where("participant.id != :userId", { userId })
      .orderBy("conversation.updatedAt", "DESC")
      .orderBy("message.createdAt", "DESC")
      .getMany();

    const conversationsWithFirstMessage = conversations.map((conversation) =>
      Object.assign(conversation, {
        messages:
          conversation.messages && conversation.messages.length > 0
            ? [conversation.messages[0]]
            : [],
      })
    );

    return conversationsWithFirstMessage;
  }

  @Query(() => Conversation)
  async getConversationById(@Arg("id") id: string) {
    const conversation = await Conversation.findOne({
      where: { id },
      relations: {
        messages: {
          sender: true,
          receiver: true,
        },
      },
      order: {
        messages: {
          createdAt: "DESC",
        },
      },
    });
    if (!conversation)
      throw new Error("Aucune conversation ne correspond à cet id");
    return conversation;
  }
}
