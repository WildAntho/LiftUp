import React from "react";
import UserAvatar from "../../UserAvatar";
import { Avatar } from "@heroui/react";
import { Notification } from "@/graphql/hooks";

type NotificationProps = {
  notification: Notification;
};

export const NewRequestNotification = ({ notification }: NotificationProps) => (
  <div>
    <UserAvatar avatar={notification.request?.sender?.avatar || ""} />
    <div>
      <span>
        {notification.request?.sender?.firstname}{" "}
        {notification.request?.sender?.lastname}
      </span>
      <p>
        Vous avez reçu une nouvelle demande
        {notification.request?.sender?.roles === "STUDENT" && " de coaching de"}
        <span className="font-semibold">
          {" "}
          {notification.request?.sender?.firstname}{" "}
          {notification.request?.sender?.lastname}
        </span>
      </p>
    </div>
  </div>
);

export const AcceptRequestNotification: React.FC<{
  notification: Notification;
}> = ({ notification }) => (
  <div>
    <UserAvatar avatar={notification.request?.receiver?.avatar || ""} />
    <div>
      <span className="font-semibold">
        {notification.request?.receiver?.firstname}{" "}
        {notification.request?.receiver?.lastname}
      </span>{" "}
      a accepté votre demande
    </div>
  </div>
);

export const NewFeedbackNotification: React.FC<{
  notification: Notification;
}> = ({ notification }) => (
  <div>
    <UserAvatar avatar={notification.feedback?.user?.avatar || ""} />
    <div>
      <span className="font-semibold">
        {notification.feedback?.user?.firstname}{" "}
        {notification.feedback?.user?.lastname}
      </span>{" "}
      a terminé la séance{" "}
      <span className="font-semibold">{notification.feedback?.title}:</span>
      {notification.feedback?.comment && (
        <p className="text-gray-500 line-clamp-2 overflow-hidden text-ellipsis">
          {notification.feedback.comment}
        </p>
      )}
    </div>
  </div>
);

export const NewTrainingNotification: React.FC = () => (
  <div>
    <Avatar src="/biceps.webp" />
    <div>
      <p className="font-semibold">Des nouvelles séances sont disponibles</p>
      <p className="text-gray-500">
        Pour les consulter rendez-vous sur votre calendrier !
      </p>
    </div>
  </div>
);
