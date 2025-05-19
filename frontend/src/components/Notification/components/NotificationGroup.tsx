import { NotificationGroup } from "@/graphql/hooks";
import {
  Dumbbell,
  Layers,
  MessageCircleQuestion,
  NotebookTabs,
} from "lucide-react";

export const groupNotifications = [
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
