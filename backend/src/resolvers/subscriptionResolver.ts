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
    topics: ["REQUEST_ADDED", "REQUEST_ACCEPTED", "NEW_FEEDBACK"],
    filter: ({ payload, args }) => {
      if (payload.topic === "REQUEST_ADDED") {
        return (
          payload.newNotification.request.receiver.id.toString() ===
          args.id.toString()
        );
      } else if (payload.topic === "REQUEST_ACCEPTED") {
        return (
          payload.newNotification.request.sender.id.toString() ===
          args.id.toString()
        );
      } else if (payload.topic === "NEW_FEEDBACK") {
        return (
          payload.newNotification.user.id.toString() === args.id.toString()
        );
      }
      return false;
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
