import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";
import { User } from "./user";
import { NotificationPreference } from "./notificationPreference";
import { ProgressSession } from "./progressSession";
import { CoachProfile } from "./coachProfile";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const isCoach = event.entity.roles === "COACH";
    const preference = NotificationPreference.create({
      user: event.entity,
    });
    const progress = ProgressSession.create({
      user: event.entity,
    });
    if (isCoach) {
      const profile = CoachProfile.create({
        user: event.entity,
      });
      await event.manager.save(profile);
    }
    await event.manager.save(preference);
    await event.manager.save(progress);
  }
}
