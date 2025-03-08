import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Notification } from "../entities/notification";
import { User } from "../entities/user";

@Resolver(Notification)
export class NotificationResolver {
  @Query(() => [Notification])
  async getNotification(@Ctx() context: { user: User }) {
    const notifications = await Notification.find({
      where: {
        user: { id: context.user.id },
      },
      relations: {
        request: true,
        user: true,
      },
      order: {
        createdAt: "DESC",
      },
      take: 10,
    });
    return notifications;
  }

  @Mutation(() => String)
  async hasBeenSeen(@Arg("id", () => [String]) ids: string[]) {
    // Utilisation de Promise.all pour traiter plusieurs notifications en parallèle
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
    // Utilisation de Promise.all pour traiter plusieurs notifications en parallèle
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
