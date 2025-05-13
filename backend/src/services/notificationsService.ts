import { Feedback } from "../entities/feedback";
import { Notification } from "../entities/notification";
import { Request } from "../entities/request";
import { User } from "../entities/user";
import {
  NotificationGroup,
  NotificationType,
} from "../InputType/notificationType";

type TargetType = "request" | "membership" | "feedback" | "training";

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
      notification.group = NotificationGroup.FOLLOW;
      break;
    case "feedback":
      targetEntity = await Feedback.findOne({
        where: { id: targetId },
        relations: { notifications: true, user: true },
      });
      notification.feedback = targetEntity;
      notification.group = NotificationGroup.TRAINING;
      break;
    case "training":
      notification.group = NotificationGroup.TRAINING;
      break;
    default:
      throw new Error("Type de cible invalide");
  }
  notification.type = type;
  notification.user = user;
  await notification.save();
  return notification;
}
