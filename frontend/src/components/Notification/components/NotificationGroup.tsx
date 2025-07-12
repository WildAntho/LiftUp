import { NotificationGroup } from "@/graphql/hooks";
import { FaLayerGroup } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { BiSolidNotepad } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa";

export const groupNotifications = [
  {
    key: null,
    label: "Tous les types",
    color: "bg-blue-500 text-blue-500",
    icon: <FaLayerGroup size={18} className="text-blue-500" />,
  },
  {
    key: NotificationGroup.Request,
    label: "Demandes",
    color: "bg-yellow-500 text-yellow-500",
    icon: <FaQuestionCircle size={18} className="text-yellow-500" />,
  },
  {
    key: NotificationGroup.Follow,
    label: "Suivi",
    color: "bg-orange-500 text-orange-500",
    icon: <BiSolidNotepad size={20} className="text-orange-500" />,
  },
  {
    key: NotificationGroup.Training,
    label: "Séances",
    color: "bg-green-500 text-green-500",
    icon: <FaDumbbell size={18} className="text-green-500" />,
  },
];
