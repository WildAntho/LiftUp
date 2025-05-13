import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Notification } from "../entities/notification";

export enum NotificationType {
  NEW_REQUEST = "NEW_REQUEST",
  ACCEPT_REQUEST = "ACCEPT_REQUEST",
  NEW_FEEDBACK = "NEW_FEEDBACK",
  NEW_TRAINING = "NEW_TRAINING",
}

registerEnumType(NotificationType, {
  name: "NotificationType",
});

export enum NotificationGroup {
  TRAINING = "TRAINING",
  FOLLOW = "FOLLOW",
}

registerEnumType(NotificationGroup, {
  name: "NotificationGroup",
});

@ObjectType()
export class NotificationResponse {
  @Field(() => [Notification])
  notifications!: Notification[];

  @Field(() => Int)
  totalUnread!: number;

  @Field(() => Int)
  total!: number;
}
