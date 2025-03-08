import UserAvatar from "@/components/UserAvatar";
import { IoArrowRedo } from "react-icons/io5";
import { Message } from "@/graphql/hooks";
import {
  UserWithoutPassword,
  useUserStore,
} from "@/services/zustand/userStore";
import { differenceInMinutes, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Tooltip } from "@heroui/tooltip";
import { repliedMessage } from "./ConversationChat";

type MessageCardProps = {
  message: Message;
  user: UserWithoutPassword | null;
  isSentByCurrentUser: boolean;
  isRead: boolean;
  markAsRead: boolean;
  lastMessageSent: boolean;
  index: number;
  setRepliedMessage: (value: repliedMessage) => void;
};

export default function MessageCard({
  message,
  user,
  isSentByCurrentUser,
  isRead,
  markAsRead,
  lastMessageSent,
  index,
  setRepliedMessage,
}: MessageCardProps) {
  const currentUser = useUserStore((state) => state.user);

  const handleReplied = () => {
    const replied = {
      repliedMessageId: message.id,
      content: message.content,
    };
    setRepliedMessage(replied);
  };

  return (
    <>
      {message?.repliedMessage && (
        <div
          className={`flex opacity-40 ${
            message.sender.id === currentUser?.id.toString()
              ? "justify-end"
              : "justify-start"
          } w-full`}
        >
          <p className="flex flex-col items-start justify-start gap-1 relative z-1 text-xs rounded-2xl px-4 pt-2 pb-7 bg-gray-white border border-gray-300 max-w-[50%] translate-y-5">
            {message?.sender.id === currentUser?.id.toString() && (
              <span className="font-semibold flex gap-2">
                <IoArrowRedo className="size-4 opacity-50" />
                {`Vous avez répondu à ${user?.firstname}`}
              </span>
            )}
            {message?.sender?.id !== currentUser?.id.toString() && (
              <span className="font-semibold flex gap-2">
                <IoArrowRedo className="size-4 opacity-50" />
                {`${user?.firstname} vous a répondu`}
              </span>
            )}
            <span className="pl-6">{message?.repliedMessage.content}</span>
          </p>
        </div>
      )}
      <div
        className={`group relative z-2 w-full flex items-center gap-2 ${
          message?.sender?.id === currentUser?.id.toString()
            ? "justify-end"
            : "justify-start"
        }`}
      >
        {message?.sender?.id !== currentUser?.id.toString() && (
          <UserAvatar avatar={user?.avatar ?? ""} size="sm" />
        )}
        <div
          className={`max-w-[70%] min-h-[35px] rounded-2xl flex items-center px-4 py-2 text-sm ${
            message?.sender?.id === currentUser?.id.toString()
              ? "justify-end bg-primary text-white"
              : "justify-start bg-gray-100 text-black"
          }`}
        >
          <p className="text-[13px]">{message?.content}</p>
        </div>
        {message?.sender?.id !== currentUser?.id.toString() && (
          <Tooltip
            content="Répondre"
            showArrow={true}
            color="foreground"
            className="text-xs"
            closeDelay={0}
          >
            <div
              className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
              onClick={handleReplied}
            >
              <IoArrowRedo className="hidden cursor-pointer group-hover:block" />
            </div>
          </Tooltip>
        )}
      </div>
      {index === 0 && isSentByCurrentUser && lastMessageSent && !isRead && (
        <p className="w-full flex justify-end text-[10px] text-gray-400 pr-2 pt-1">
          Envoyé
        </p>
      )}
      {markAsRead && isSentByCurrentUser && (
        <p className="w-full flex justify-end text-[10px] text-gray-400 pr-2 pt-1">
          {differenceInMinutes(new Date(), message?.readAt) < 1
            ? "Vu à l'instant"
            : `Vu il y a ${formatDistanceToNow(message?.readAt, {
                locale: fr,
              })}`}
        </p>
      )}
    </>
  );
}
