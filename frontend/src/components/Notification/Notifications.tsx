import {
  Avatar,
  Drawer,
  DrawerContent,
  Tab,
  Tabs,
  Tooltip,
} from "@heroui/react";
import {
  Bell,
  CheckCheck,
  Dumbbell,
  Layers,
  MessageCircleQuestion,
  NotebookTabs,
} from "lucide-react";
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
import UserAvatar from "../UserAvatar";

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
    fetchPolicy: "no-cache",
  });
  const [hasBeenSeen] = useHasBeenseenMutation();
  const [isRead] = useIsReadMutation();

  const navigate = useNavigate();

  // Notification reçue via la subscription
  const socketNotification = dataSub?.newNotification;

  // Récupère les requêtes non lues depuis la requête HTTP
  const [allNotifications, setAllNotifications] = useState(
    dataNotif?.getNotification.notifications ?? []
  );

  const totalUnread = dataNotif?.getNotification.totalUnread ?? 0;
  const total = dataNotif?.getNotification.total ?? 0;

  // Mettre à jour les notifications non lues lors du chargement initial
  useEffect(() => {
    if (dataNotif?.getNotification) {
      setAllNotifications(dataNotif?.getNotification.notifications);
    }
  }, [dataNotif]);

  // Ajouter la nouvelle notification au tableau sans écraser les anciennes
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

  const handleRedirect = async (id: string, type: string, read: boolean) => {
    if (!read) {
      await isRead({
        variables: { ids: id },
      });
      refetch();
    }
    switch (type) {
      case NotificationType.NewRequest:
        navigate("/students?tab=request");
        break;
      case NotificationType.AcceptRequest:
        navigate("/coach");
        break;
      case NotificationType.NewFeedback:
      case NotificationType.NewTraining:
        navigate("/home?tab=calendar");
        break;
      default:
        break;
    }
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

  // Fonction pour obtenir le contenu spécifique de chaque type de notification
  const getNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case "NEW_REQUEST":
        return {
          avatar: (
            <UserAvatar avatar={notification.request?.sender.avatar || ""} />
          ),
          name:
            notification.request?.sender.firstname +
            " " +
            notification.request?.sender.lastname,
          message: (
            <>
              Vous avez reçu une nouvelle demande{" "}
              {notification.request?.sender.roles === "STUDENT" &&
                "de coaching de"}{" "}
              <span className="font-semibold">
                {notification.request?.sender.firstname +
                  " " +
                  notification.request?.sender.lastname}
              </span>
            </>
          ),
        };
      case "ACCEPT_REQUEST":
        return {
          avatar: (
            <UserAvatar avatar={notification.request?.receiver.avatar || ""} />
          ),
          name:
            notification.request?.receiver.firstname +
            " " +
            notification.request?.receiver.lastname,
          message: (
            <>
              <span className="font-semibold">
                {notification.request?.receiver.firstname +
                  " " +
                  notification.request?.receiver.lastname}
              </span>{" "}
              à accepter votre demande
            </>
          ),
        };
      case "NEW_FEEDBACK":
        return {
          avatar: (
            <UserAvatar avatar={notification.feedback?.user.avatar || ""} />
          ),
          name:
            notification.feedback?.user.firstname +
            " " +
            notification.feedback?.user.lastname,
          message: (
            <>
              <div className="line-clamp-2 overflow-hidden text-ellipsis">
                <span className="font-semibold">
                  {notification.feedback?.user.firstname}
                </span>{" "}
                a terminé la séance{" "}
                <span className="font-semibold">
                  {notification.feedback?.title}:
                </span>
              </div>
              {notification.feedback?.comment ? (
                <>
                  <span className="text-gray-500 line-clamp-2 overflow-hidden text-ellipsis">
                    {notification.feedback?.comment}
                  </span>
                </>
              ) : null}
            </>
          ),
        };
      case "NEW_TRAINING":
        return {
          avatar: <Avatar src="/biceps.webp" />,
          name: "Nouveaux entraînements",
          message: (
            <>
              <div className="line-clamp-2 overflow-hidden text-ellipsis">
                <p className="font-semibold">
                  Des nouvelles séances sont disponibles
                </p>
                <p className="text-gray-500">
                  Pour les consulter rendez vous sur votre calendrier !
                </p>
              </div>
            </>
          ),
        };
      default:
        return {
          avatar: "",
          name: "",
          message: "Notification",
        };
    }
  };

  const groupNotifications = [
    {
      key: null,
      label: "Tous les types",
      color: "bg-blue-500 text-blue-500",
      icon: <Layers size={16} className="text-blue-500" />,
    },
    {
      key: NotificationGroup.Request,
      label: "Demandes",
      color: "bg-yellow-500 text-yellow-500",
      icon: <MessageCircleQuestion size={16} className="text-yellow-500" />,
    },
    {
      key: NotificationGroup.Follow,
      label: "Suivi",
      color: "bg-orange-500 text-orange-500",
      icon: <NotebookTabs size={16} className="text-orange-500" />,
    },
    {
      key: NotificationGroup.Training,
      label: "Séances",
      color: "bg-green-500 text-green-500",
      icon: <Dumbbell size={16} className="text-green-500" />,
    },
  ];

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
            className="p-2 w-full min-h-14 flex justify-start items-center gap-2 overflow-x-scroll"
          >
            {groupNotifications.map((g) => (
              <div
                key={g.key}
                className={`h-full flex justify-center items-center gap-2 px-4 text-sm rounded-lg bg-opacity-10 cursor-pointer ${
                  activeGroup === g.key
                    ? g.color
                    : "bg-none text-dark hover:bg-dark/10 transition-all duration-200 ease-in-out"
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
