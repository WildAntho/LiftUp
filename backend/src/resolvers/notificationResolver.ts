import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Notification } from "../entities/notification";
import { User } from "../entities/user";
import {
  NotificationGroup,
  NotificationResponse,
} from "../InputType/notificationType";

@Resolver(Notification)
export class NotificationResolver {
  @Query(() => NotificationResponse)
  async getNotification(
    @Ctx() context: { user: User },
    @Arg("unread", { nullable: true }) unread?: boolean,
    @Arg("group", { nullable: true }) group?: NotificationGroup
  ): Promise<NotificationResponse> {
    const whereClause = {
      user: { id: context.user.id },
      ...(unread !== false && { isRead: !unread }),
      ...(group && { group }),
    };

    // Récupérer les notifications avec la clause `where`
    const notifications = await Notification.find({
      where: whereClause,
      relations: {
        request: true,
        user: true,
        feedback: true,
        membership: true,
      },
      order: {
        createdAt: "DESC",
      },
      take: 10,
    });

    // Calculer le nombre total de notifications non lues
    const totalUnread = await Notification.count({
      where: {
        user: { id: context.user.id },
        isRead: false,
        ...(group && { group }),
      },
    });

    // Calculer le nombre total de notifications
    const total = await Notification.count({
      where: {
        user: { id: context.user.id },
        ...(group && { group }),
      },
    });

    return {
      notifications,
      totalUnread,
      total,
    };
  }

  @Mutation(() => String)
  async hasBeenSeen(@Arg("id", () => [String]) ids: string[]) {
    await Promise.all(
      ids.map(async (id) => {
        const notification = await Notification.findOneBy({ id });
        if (!notification) {
          throw new Error(`Aucune notification trouvée pour l'id ${id}`);
        }
        notification.hasBeenSeen = true;
        await notification.save();
      })
    );

    return JSON.stringify("Les notifications ont été marquées comme vues");
  }

  @Mutation(() => String)
  async isRead(@Arg("id", () => [String]) ids: string[]) {
    await Promise.all(
      ids.map(async (id) => {
        const notification = await Notification.findOneBy({ id });
        if (!notification) {
          throw new Error(`Aucune notification trouvée pour l'id ${id}`);
        }
        notification.isRead = true;
        await notification.save();
      })
    );
    return JSON.stringify("La notification a été marqué comme lu");
  }
}
