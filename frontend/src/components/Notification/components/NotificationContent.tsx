import UserAvatar from "../../UserAvatar";
import { Avatar } from "@heroui/react";
import { Notification, UserRole } from "@/graphql/hooks";

type NotificationComponentProps = {
  notification?: Notification;
};

export const NewRequestNotification = ({
  notification,
}: NotificationComponentProps) => {
  return {
    avatar: <UserAvatar avatar={notification?.request?.sender.avatar || ""} />,
    message: (
      <>
        Vous avez reçu une nouvelle demande{" "}
        {notification?.request?.sender.roles.includes(UserRole.Student) && "de coaching de"}{" "}
        <span className="font-semibold">
          {notification?.request?.sender.firstname +
            " " +
            notification?.request?.sender.lastname}
        </span>
      </>
    ),
  };
};

export const AcceptRequestNotification = ({
  notification,
}: NotificationComponentProps) => {
  return {
    avatar: (
      <UserAvatar avatar={notification?.request?.receiver.avatar || ""} />
    ),
    message: (
      <>
        <span className="font-semibold">
          {notification?.request?.receiver.firstname +
            " " +
            notification?.request?.receiver.lastname}
        </span>{" "}
        à accepter ta demande
      </>
    ),
  };
};

export const NewFeedbackNotification = ({
  notification,
}: NotificationComponentProps) => {
  return {
    avatar: <UserAvatar avatar={notification?.feedback?.user.avatar || ""} />,
    message: (
      <>
        <div className="line-clamp-2 overflow-hidden text-ellipsis">
          <span className="font-semibold">
            {notification?.feedback?.user.firstname}
          </span>{" "}
          a terminé la séance{" "}
          <span className="font-semibold">
            "{notification?.feedback?.title}"
          </span>
        </div>
        {notification?.feedback?.comment ? (
          <span className="text-gray-500 line-clamp-2 overflow-hidden text-ellipsis">
            {notification?.feedback?.comment}
          </span>
        ) : null}
      </>
    ),
  };
};

export const NewTrainingNotification = () => {
  return {
    avatar: <Avatar src="/biceps.webp" />,
    message: (
      <>
        <div className="line-clamp-3 overflow-hidden text-ellipsis">
          <p className="font-semibold">Prêt à te surpasser ?</p>
          <p className="text-gray-500">
            De nouvelles séances t'attendent dans ton calendrier !
          </p>
        </div>
      </>
    ),
  };
};

export const ActivateMembershipNotification = () => {
  return {
    avatar: <Avatar src="/activation.webp" />,
    message: (
      <>
        <div className="line-clamp-3 overflow-hidden text-ellipsis">
          <p className="font-semibold">
            Bonne nouvelle ! Ton suivi a été activé.
          </p>
          <p className="text-gray-500">
            Prêt à recevoir des séances sur mesure ?
          </p>
        </div>
      </>
    ),
  };
};

export const CancelMembershipNotification = ({
  notification,
}: NotificationComponentProps) => {
  return {
    avatar: (
      <UserAvatar avatar={notification?.membership?.student.avatar || ""} />
    ),
    message: (
      <>
        <span className="font-semibold">
          {notification?.membership?.student.firstname +
            " " +
            notification?.membership?.student.lastname +
            " "}
        </span>
        a annulé son abonnement. Il ne fait désormais plus partie de vos élèves.
      </>
    ),
  };
};

export const DefaultNotification = () => {
  return {
    avatar: "",
    message: "Notification",
  };
};
