import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";
import { User } from "./user";
import { NotificationPreference } from "./notificationPreference";
import { ProgressSession } from "./progressSession";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const preference = NotificationPreference.create({
      user: event.entity,
    });
    const progress = ProgressSession.create({
      user: event.entity,
    });
    await event.manager.save(preference);
    await event.manager.save(progress);
  }
}
