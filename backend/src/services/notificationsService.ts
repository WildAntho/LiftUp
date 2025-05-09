import { Notification } from "../entities/notification";
import { Request } from "../entities/request";
import { User } from "../entities/user";
import { NotificationType } from "../InputType/notificationType";

type TargetType = "request" | "membership";

export async function createNotification(
  targetType: TargetType,
  targetId: string,
  type: NotificationType,
  userId: string
): Promise<Notification> {
  const notification = new Notification();
  const user = await User.findOne({
    where: {
      id: userId,
    },
    relations: {
      notifications: true,
    },
  });
  if (!user) throw new Error("Utilisateur non trouvé");
  let targetEntity: any;
  switch (targetType) {
    case "request":
      targetEntity = await Request.findOne({
        where: { id: targetId },
        relations: { notifications: true },
      });
      notification.request = targetEntity;
      break;
    default:
      throw new Error("Type de cible invalide");
  }
  if (!targetEntity) throw new Error("Impossible de trouver l'entité cible");
  notification.type = type;
  notification.user = user;
  await notification.save();
  return notification;
}
