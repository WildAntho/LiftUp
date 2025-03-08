import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  PubSub,
  Query,
  Resolver,
} from "type-graphql";
import { Message } from "../entities/message";
import {
  AddMessagetData,
  MarkAsReadResponse,
  MessageResult,
} from "../InputType/messageType";
import { User } from "../entities/user";
import { In, IsNull, LessThan } from "typeorm";
import { Conversation } from "../entities/conversation";

@Resolver(Message)
export class MessageResolver {
  @Authorized()
  @Mutation(() => String)
  async addMessages(
    @Arg("data")
    {
      receiverId,
      senderId,
      content,
      isNew,
      conversationId,
      repliedMessageId,
    }: AddMessagetData,
    @Ctx() context: { pubsub: PubSub; user: User }
  ) {
    try {
      // 🔹 Vérifier si les utilisateurs existent
      const [sender, receiver] = await Promise.all([
        User.findOneBy({ id: senderId }),
        User.findOneBy({ id: receiverId }),
      ]);

      if (!sender || !receiver) {
        throw new Error("Un ou plusieurs utilisateurs sont introuvables.");
      }

      let conversation: Conversation | null = null;

      // 🔹 Vérifier ou créer la conversation
      if (conversationId) {
        conversation = await Conversation.findOne({
          where: { id: conversationId },
          relations: { messages: true },
        });

        if (!conversation && !isNew) {
          throw new Error("La conversation spécifiée n'existe pas.");
        }
      }

      // 🔹 Création d'une nouvelle conversation si nécessaire
      if (!conversationId && isNew) {
        const participants = await User.find({
          where: { id: In([receiverId, senderId]) },
        });

        if (participants.length < 2) {
          throw new Error("Impossible de récupérer les participants.");
        }

        conversation = new Conversation();
        conversation.participants = participants;
        await conversation.save();
      }

      if (!conversation) {
        throw new Error(
          "Erreur lors de la récupération ou création de la conversation."
        );
      }

      // 🔹 Mise à jour de la conversation
      conversation.updatedAt = new Date();
      await conversation.save();

      // 🔹 Création et sauvegarde du message
      let repliedMessage;
      if (repliedMessageId) {
        repliedMessage = await Message.findOne({
          where: {
            id: repliedMessageId,
          },
        });
        if (!repliedMessage)
          throw new Error("Aucun message ne correspond à cet id");
      }
      const newMessage = new Message();
      newMessage.receiver = receiver;
      newMessage.sender = sender;
      newMessage.content = content;
      newMessage.conversation = conversation;
      newMessage.repliedMessage = repliedMessage;

      await newMessage.save();

      // 🔹 Publier le message sur GraphQL Subscriptions
      context.pubsub.publish("NEW_MESSAGE", {
        newMessage,
        topic: "NEW_MESSAGE",
      });

      return isNew ? conversation.id : "Le message a été ajouté avec succès";
    } catch (error) {
      console.error("❌ Erreur dans addMessages:", error);
      throw new Error("Une erreur est survenue lors de l'ajout du message.");
    }
  }

  @Authorized()
  @Query(() => MessageResult)
  async getMessages(
    @Arg("id") conversationId: string,
    @Arg("limit", { nullable: true, defaultValue: 20 }) limit: number,
    @Arg("cursor", () => String, { nullable: true, defaultValue: "" })
    cursor: string
  ) {
    const whereConditions: any = {
      conversation: {
        id: conversationId,
      },
    };

    if (cursor) {
      whereConditions["id"] = LessThan(cursor);
    }
    const messages = await Message.find({
      where: whereConditions,
      relations: {
        conversation: true,
        sender: true,
        receiver: true,
        repliedMessage: true,
      },
      order: {
        createdAt: "DESC",
      },
      take: limit,
    });
    const totalCount = await Message.count({
      where: { conversation: { id: conversationId } },
    });
    return {
      messages,
      totalCount,
    };
  }

  @Authorized()
  @Mutation(() => MarkAsReadResponse)
  async markAsRead(
    @Arg("id") id: string,
    @Ctx() context: { pubsub: PubSub; user: User }
  ) {
    const messages = await Message.find({
      where: {
        conversation: { id },
        readAt: IsNull(),
        receiver: { id: context.user.id },
      },
      relations: {
        conversation: true,
        receiver: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
    if (messages.length === 0) return { message: "allRead" };
    const currentTime = new Date();
    for (const message of messages) {
      message.readAt = currentTime;
      await message.save();
    }

    context.pubsub.publish("MESSAGES_READ", {
      conversationId: id,
      user: context.user.id,
      lastMessageId: messages[0].id,
      topic: "MESSAGES_READ",
    });
    return { message: "success" };
  }

  // @Mutation(() => Boolean)
  // async userTyping(
  //   @Arg("conversationId") conversationId: string,
  //   @Ctx() context: { pubsub: PubSub; user: User }
  // ) {
  //   context.pubsub.publish("USER_TYPING", {
  //     user: context.user,
  //     conversation: conversationId,
  //     isTyping: true,
  //     topic: "USER_TYPING",
  //   });
  //   return true;
  // }

  // @Mutation(() => Boolean)
  // async userStopTyping(
  //   @Arg("conversationId") conversationId: string,
  //   @Ctx() context: { pubsub: PubSub; user: User }
  // ) {
  //   context.pubsub.publish("USER_STOP_TYPING", {
  //     user: context.user,
  //     conversation: conversationId,
  //     isTyping: false,
  //     topic: "USER_STOP_TYPING",
  //   });
  //   return true;
  // }

  @Authorized()
  @Query(() => Int)
  async getTotalUnreadMessage(@Ctx() context: { user: User }) {
    const unreadMessages = await Message.find({
      where: {
        readAt: IsNull(),
        receiver: { id: context.user.id },
      },
      relations: {
        receiver: true,
      },
    });
    return unreadMessages.length;
  }
}
