import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Bell } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import {
  useGetNotificationQuery,
  useHasBeenseenMutation,
  useIsReadMutation,
  useSubNewNotificationSubscription,
} from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import UserAvatar from "./UserAvatar";

export default function Notifications() {
  const currentUser = useUserStore((state) => state.user);
  const { data: dataSub } = useSubNewNotificationSubscription({
    variables: { id: currentUser?.id.toString() as string },
    fetchPolicy: "no-cache",
  });
  const { data: dataNotif, refetch } = useGetNotificationQuery({
    fetchPolicy: "no-cache",
  });
  const [hasBeenSeen] = useHasBeenseenMutation();
  const [isRead] = useIsReadMutation();

  const navigate = useNavigate();

  // Notification reçue via la subscription
  const socketNotification = dataSub?.newNotification;

  // Récupère les requêtes non lues depuis la requête HTTP
  const [allNotifications, setAllNotifications] = useState(
    dataNotif?.getNotification ?? []
  );

  // Mettre à jour les notifications non lues lors du chargement initial
  useEffect(() => {
    if (dataNotif?.getNotification) {
      setAllNotifications(dataNotif?.getNotification);
    }
  }, [dataNotif]);

  // Ajouter la nouvelle notification au tableau sans écraser les anciennes
  useEffect(() => {
    if (socketNotification) {
      setAllNotifications((prev) => [socketNotification, ...prev]);
    }
  }, [socketNotification]);

  const countRequest = allNotifications.reduce((acc, curr) => {
    if (!curr.hasBeenSeen) return acc + 1;
    return acc;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = async (id: string, type: string, read: boolean) => {
    if (!read) {
      await isRead({
        variables: { ids: id },
      });
      refetch();
    }
    if (type === "NEW_REQUEST") {
      if (currentUser?.roles === "COACH") {
        navigate("/students?tab=request");
      } else {
        navigate("/coach");
      }
    } else if (type === "ACCEPT_REQUEST") {
      if (currentUser?.roles === "COACH") {
        navigate("/students");
      } else {
        navigate("/coach");
      }
    }
    setIsOpen(false);
  };

  const handleNotifSeen = async () => {
    const notEverythingSeen = allNotifications.some(
      (notif) => !notif.hasBeenSeen
    );
    if (notEverythingSeen) {
      const optimisticNotification = allNotifications.map((notif) => ({
        ...notif,
        hasBeenSeen: true,
      }));
      setAllNotifications(optimisticNotification);
      const ids = allNotifications
        .filter((notif) => !notif.hasBeenSeen)
        .map((notif) => notif.id);
      await hasBeenSeen({
        variables: { ids },
      });
      refetch();
    }
  };

  const handleMarkAsAllSeen = async () => {
    const notEverythingRead = allNotifications.some((notif) => !notif.isRead);
    if (notEverythingRead) {
      const optimisticNotification = allNotifications.map((notif) => ({
        ...notif,
        isRead: true,
      }));
      setAllNotifications(optimisticNotification);
      const ids = allNotifications
        .filter((notif) => !notif.isRead)
        .map((notif) => notif.id);
      await isRead({
        variables: { ids },
      });
      refetch();
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger>
        <div className="relative cursor-pointer">
          <div
            className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
            onClick={handleNotifSeen}
          >
            <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800 transition" />
          </div>
          {countRequest > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {countRequest}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[370px] py-4 px-0 text-sm flex flex-col justify-start items-start">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <p className="font-semibold">Notifications</p>
          <Separator />
        </div>
        <div className="w-full flex justify-end items-center">
          <p
            className="text-xs text-primary my-3 pr-2 cursor-pointer hover:underline"
            onClick={handleMarkAsAllSeen}
          >
            Marquer tout comme lu
          </p>
        </div>
        <div className="w-full max-h-[70vh] flex flex-col justify-start overflow-y-auto">
          {allNotifications.length > 0 ? (
            allNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`w-full h-[80px] flex justify-center items-center relative ${
                  !notification.isRead &&
                  "bg-primary bg-opacity-5 hover:bg-opacity-10"
                } flex-shrink-0 cursor-pointer hover:bg-primary hover:bg-opacity-10 pr-4 pl-7`}
              >
                {notification.type === "NEW_REQUEST" && (
                  <div
                    className="flex justify-between items-center w-full h-full"
                    onClick={() =>
                      handleRedirect(
                        notification.id,
                        notification.type,
                        notification.isRead
                      )
                    }
                  >
                    <div className="flex justify-start items-center gap-4 pr-4">
                      <UserAvatar
                        avatar={notification.request?.sender.avatar ?? ""}
                      />
                      <p className="text-xs w-[55%]">
                        Vous avez reçu une nouvelle demande{" "}
                        {notification.request?.sender.roles === "STUDENT" &&
                          "de coaching de"}{" "}
                        <span className="font-semibold">
                          {notification.request?.sender.firstname +
                            " " +
                            notification.request?.sender.lastname}
                        </span>
                      </p>
                    </div>
                    <p className="text-[10px] text-gray-500 absolute right-2">
                      {formatDistanceToNow(notification.createdAt, {
                        locale: fr,
                      })}
                    </p>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full absolute bg-primary left-2" />
                    )}
                  </div>
                )}
                {notification.type === "ACCEPT_REQUEST" && (
                  <div
                    className="flex justify-between items-center w-full h-full"
                    onClick={() =>
                      handleRedirect(
                        notification.id,
                        notification.type,
                        notification.isRead
                      )
                    }
                  >
                    <div className="flex justify-start items-center gap-4 pr-4">
                      <UserAvatar
                        avatar={notification.request?.receiver.avatar ?? ""}
                      />
                      <p className="text-xs w-[55%]">
                        <span className="font-semibold">
                          {notification.request?.receiver.firstname +
                            " " +
                            notification.request?.receiver.lastname}
                        </span>{" "}
                        à accepter votre demande
                      </p>
                    </div>
                    <p className="text-[10px] text-gray-500 absolute right-2">
                      {formatDistanceToNow(notification.createdAt, {
                        locale: fr,
                      })}
                    </p>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full absolute bg-primary left-2" />
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 w-full flex justify-center my-4">
              Vous n'avez aucune notification
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
