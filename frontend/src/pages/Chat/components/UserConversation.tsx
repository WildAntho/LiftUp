import UserAvatar from "@/components/UserAvatar";
import { Conversation, useNewMessageSubscription } from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { differenceInMinutes, formatDistanceStrict } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect } from "react";

type UserConversationProps = {
  conversation: Conversation;
  currentConversationId: string;
  refetch: () => void;
};

export default function UserConversation({
  conversation,
  currentConversationId,
  refetch,
}: UserConversationProps) {
  const currentUser = useUserStore((state) => state.user);
  const user = conversation.participants[0];
  const lastMessage =
    conversation.messages &&
    conversation.messages.length > 0 &&
    conversation.messages[0];
  const createdAt =
    conversation.messages && conversation.messages.length > 0
      ? conversation.messages[0].createdAt
      : "";
  const senderLastMessage =
    conversation.messages && conversation.messages.length > 0
      ? conversation.messages[0].sender.id
      : "";
  const { data: dataMessageSub } = useNewMessageSubscription({
    variables: { id: conversation.id },
    fetchPolicy: "network-only",
  });
  const subMessage = dataMessageSub?.newMessage;

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subMessage]);

  const isRead =
    lastMessage &&
    (lastMessage.readAt ||
      lastMessage.sender.id === currentUser?.id.toString() ||
      conversation.id === currentConversationId);

  return (
    <div className=" w-full flex justify-between items-center">
      {!isRead && (
        <span className="w-2 h-2 rounded-full absolute bg-primary left-5" />
      )}
      <div className="flex justify-start items-center gap-2 flex-1">
        <UserAvatar avatar={user.avatar ?? ""} />
        <div className="flex flex-col items-start justify-center flex-1">
          <p>{user.firstname + " " + user.lastname}</p>
          <div className="flex justify-between items-center w-full">
            {lastMessage && (
              <p
                className={`text-xs ${
                  !isRead ? "text-black font-semibold" : "text-gray-400"
                }`}
              >
                {senderLastMessage === currentUser?.id.toString()
                  ? "Vous:"
                  : ""}{" "}
                {lastMessage.content.slice(0, 20) +
                  `${lastMessage.content.length > 20 ? "..." : ""}`}
              </p>
            )}
            {createdAt && (
              <p
                className={`text-[10px] ${
                  !isRead ? "text-black font-semibold" : "text-gray-400"
                }`}
              >
                {differenceInMinutes(new Date(), createdAt) < 1
                  ? "A l'instant"
                  : formatDistanceStrict(new Date(), createdAt, {
                      locale: fr,
                    })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
