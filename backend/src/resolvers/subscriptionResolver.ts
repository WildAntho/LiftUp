import {
  Args,
  ArgsType,
  Field,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Notification } from "../entities/notification";

@ArgsType()
class NotificationArgs {
  @Field()
  id!: string;
}

@Resolver(Notification)
export class SubscriptionResolver {
  @Subscription(() => Notification, {
    topics: [
      "REQUEST_ADDED",
      "REQUEST_ACCEPTED",
      "NEW_FEEDBACK",
      "NEW_TRAINING",
      "ACTIVE_MEMBERSHIP",
    ],
    filter: ({ payload, args }) => {
      return payload.newNotification.user.id.toString() === args.id.toString();
    },
  })
  newNotification(
    @Root()
    payload: {
      newNotification: Notification;
      topic: string;
    },
    @Args() args: NotificationArgs
  ): Notification {
    return payload.newNotification;
  }
}
