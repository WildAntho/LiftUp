import { NotificationType } from "@/graphql/hooks";

export const getNotificationRedirectPath = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.NewRequest:
      return "/students?tab=request";
    case NotificationType.AcceptRequest:
      return "/coach";
    case NotificationType.NewFeedback:
    case NotificationType.NewTraining:
      return "/home?tab=calendar";
    case NotificationType.ActivateMembership:
      return "/home?tab=coaching";
    case NotificationType.CancelMembership:
      return "/students?tab=students";
    default:
      return "";
  }
};
