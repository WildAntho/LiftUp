import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";
import { User } from "./user";
import { NotificationPreference } from "./notificationPreference";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const preference = NotificationPreference.create({
      user: event.entity,
    });
    await event.manager.save(preference);
  }
}
