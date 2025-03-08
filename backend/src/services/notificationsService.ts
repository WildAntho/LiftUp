import { Notification } from "../entities/notification";
import { Request } from "../entities/request";
import { User } from "../entities/user";
import { NotificationType } from "../type";

export async function createNotification(
  requestId: string,
  type: NotificationType,
  userId: string
): Promise<Notification> {
  const notification = new Notification();
  const request = await Request.findOne({
    where: {
      id: requestId,
    },
    relations: {
      notifications: true,
    },
  });
  const user = await User.findOne({
    where: {
      id: userId,
    },
    relations: {
      notifications: true,
    },
  });
  if (!request || !user) throw new Error("Impossible de créer la notification");
  notification.request = request;
  notification.type = type;
  notification.user = user;
  await notification.save();
  return notification;
}
