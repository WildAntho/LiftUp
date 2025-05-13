import { NotificationPreference } from "../entities/notificationPreference";
import { NotificationType } from "../InputType/notificationType";

export default async function isNotificationAllowed(
  type: NotificationType,
  userId: string
) {
  const preference = await NotificationPreference.findOne({
    where: {
      user: { id: userId },
    },
    relations: { user: true },
  });
  return !preference?.disabledTypes.includes(type);
}
