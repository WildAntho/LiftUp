import { registerEnumType } from "type-graphql";

export enum NotificationType {
  NEW_REQUEST = "NEW_REQUEST",
  ACCEPT_REQUEST = "ACCEPT_REQUEST",
}

registerEnumType(NotificationType, {
  name: "NotificationType",
});
