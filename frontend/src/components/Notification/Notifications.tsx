import { Drawer, DrawerContent, Tab, Tabs, Tooltip } from "@heroui/react";
import { Bell, CheckCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Notification,
  NotificationGroup,
  NotificationType,
  useGetNotificationQuery,
  useHasBeenseenMutation,
  useIsReadMutation,
  useSubNewNotificationSubscription,
} from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  AcceptRequestNotification,
  ActivateMembershipNotification,
  CancelMembershipNotification,
  DefaultNotification,
  NewFeedbackNotification,
  NewRequestNotification,
  NewTrainingNotification,
} from "./components/NotificationContent";
import { groupNotifications } from "./components/NotificationGroup";
import { getNotificationRedirectPath } from "./components/NotificationRedirect";

interface NotificationContentProps {
  avatar: React.ReactNode;
  message: React.ReactNode;
}

export default function Notifications() {
  const currentUser = useUserStore((state) => state.user);
  const [tabRead, setTabread] = useState("all");
  const [activeGroup, setActiveGroup] = useState<NotificationGroup | null>(
    null
  );
  const { data: dataSub } = useSubNewNotificationSubscription({
    variables: { id: currentUser?.id.toString() as string },
    fetchPolicy: "no-cache",
  });
  const { data: dataNotif, refetch } = useGetNotificationQuery({
    variables: {
      unread: tabRead === "unread",
      group: activeGroup,
    },
  });
  const [hasBeenSeen] = useHasBeenseenMutation();
  const [isRead] = useIsReadMutation();

  const navigate = useNavigate();

  const socketNotification = dataSub?.newNotification;

  const [allNotifications, setAllNotifications] = useState(
    dataNotif?.getNotification.notifications ?? []
  );

  const totalUnread = dataNotif?.getNotification.totalUnread ?? 0;
  const total = dataNotif?.getNotification.total ?? 0;

  useEffect(() => {
    if (dataNotif?.getNotification) {
      setAllNotifications(dataNotif?.getNotification.notifications);
    }
  }, [dataNotif]);

  useEffect(() => {
    if (socketNotification) {
      refetch();
    }
  }, [socketNotification, refetch]);

  const countRequest = allNotifications.reduce((acc, curr) => {
    if (!curr.hasBeenSeen) return acc + 1;
    return acc;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = async (
    id: string,
    type: NotificationType,
    read: boolean
  ) => {
    if (!read) {
      await isRead({
        variables: { ids: id },
      });
      refetch();
    }
    const redirectPath = getNotificationRedirectPath(type);
    navigate(redirectPath);
    setIsOpen(false);
  };

  const handleNotifSeen = async () => {
    setIsOpen(true);
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

  const getNotificationContent = (
    notification: Notification
  ): NotificationContentProps => {
    switch (notification.type) {
      case NotificationType.NewRequest:
        return NewRequestNotification({ notification });
      case NotificationType.AcceptRequest:
        return AcceptRequestNotification({ notification });
      case NotificationType.NewFeedback:
        return NewFeedbackNotification({ notification });
      case NotificationType.NewTraining:
        return NewTrainingNotification();
      case NotificationType.ActivateMembership:
        return ActivateMembershipNotification();
      case NotificationType.CancelMembership:
        return CancelMembershipNotification({ notification });
      default:
        return DefaultNotification();
    }
  };

  return (
    <>
      <div className="relative cursor-pointer">
        <div
          className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
          onClick={handleNotifSeen}
        >
          <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800 transition" />
        </div>
        {totalUnread > 0 && countRequest > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {!socketNotification ? totalUnread : countRequest}
          </span>
        )}
      </div>
      <Drawer
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
        size="lg"
        backdrop="transparent"
        classNames={{
          base: "rounded-none",
        }}
      >
        <DrawerContent>
          <div className="w-full flex flex-col items-center justify-center gap-4 pt-4">
            <div className="relative w-[80%] flex justify-center items-center">
              <p className="font-semibold">Notifications</p>
              <div
                className="group absolute -left-5 cursor-pointer bg-green-400 bg-opacity-10 hover:bg-green-500 hover:bg-opacity-20 rounded-sm p-1"
                onClick={handleMarkAsAllSeen}
              >
                <Tooltip
                  content="Marquer tout comme lu"
                  showArrow={true}
                  color="foreground"
                  className="text-xs"
                >
                  <CheckCheck
                    size={20}
                    className="group-hover:text-green-500 text-green-300"
                  />
                </Tooltip>
              </div>
            </div>
            <Separator />
          </div>
          <Tabs
            aria-label="Read"
            fullWidth
            selectedKey={tabRead}
            onSelectionChange={(key) => setTabread(key as string)}
            classNames={{
              tabList: "rounded-none",
            }}
          >
            <Tab
              title={
                <div className="flex items-center space-x-2">
                  <span>Tous</span>
                  <div
                    className={`w-6 h-6 flex justify-center items-center bg-dark text-gray-400 text-xs rounded-sm font-semibold ${
                      tabRead === "all"
                        ? "opacity-100 text-white"
                        : "bg-opacity-20"
                    }`}
                  >
                    {total}
                  </div>
                </div>
              }
              key="all"
            />
            <Tab
              title={
                <div className="flex items-center space-x-2">
                  <span>Non lu</span>
                  <div
                    className={`w-6 h-6 flex justify-center items-center bg-red-500 text-red-500 text-xs rounded-sm font-semibold ${
                      tabRead === "unread"
                        ? "opacity-100 text-white"
                        : "bg-opacity-20"
                    }`}
                  >
                    {!socketNotification ? totalUnread : countRequest}
                  </div>
                </div>
              }
              key="unread"
            />
          </Tabs>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.2,
              ease: "easeOut",
            }}
            className="p-2 w-full min-h-14 flex justify-start items-center gap-2"
          >
            {groupNotifications.map((g) => (
              <div
                key={g.key}
                className={`h-full flex justify-center items-center gap-2 px-4 text-sm rounded-lg bg-opacity-10 cursor-pointer ${
                  activeGroup === g.key
                    ? g.color
                    : "bg-none text-dark hover:bg-dark/5 transition-all duration-200 ease-in-out"
                }`}
                onClick={() => setActiveGroup(g.key)}
              >
                {g.icon}
                {g.label}
              </div>
            ))}
          </motion.div>
          <div className="w-full flex flex-col justify-start overflow-y-auto">
            {allNotifications.length > 0 ? (
              allNotifications.map((notification) => {
                const { avatar, message } = getNotificationContent(
                  notification as Notification
                );
                return (
                  <div
                    key={notification.id}
                    className={`w-full h-[80px] border-b-1 border-gray-100 flex justify-center items-center relative ${
                      !notification.isRead &&
                      "bg-primary bg-opacity-5 hover:bg-opacity-10"
                    } flex-shrink-0 cursor-pointer hover:bg-primary hover:bg-opacity-10 pr-4 pl-7`}
                    onClick={() =>
                      handleRedirect(
                        notification.id,
                        notification.type,
                        notification.isRead
                      )
                    }
                  >
                    <div className="flex items-center w-full h-full">
                      <div className="flex flex-1 items-center gap-4">
                        {avatar}
                        <div className="text-xs flex-1">{message}</div>
                      </div>
                      <p className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                        {formatDistanceToNow(notification.createdAt, {
                          locale: fr,
                        })}
                      </p>
                      {!notification.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary ml-2 absolute left-0" />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-500 w-full flex justify-center mt-10">
                Vous n'avez aucune notification
              </p>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
