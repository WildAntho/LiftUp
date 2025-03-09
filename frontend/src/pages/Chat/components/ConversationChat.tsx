import { Input } from "@/components/ui/input";
import { useInView } from "react-intersection-observer";
import { getLastReadMessageIndex, uploadURL } from "@/services/utils";
import {
  UserWithoutPassword,
  useUserStore,
} from "@/services/zustand/userStore";
import { User } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";
import { SendHorizontal } from "lucide-react";
import imgDefault from "../../../../public/default.jpg";
import {
  Message,
  useAddMessageMutation,
  useGetMessagesQuery,
  useLastMessageReadSubscription,
  useMarkAsReadMutation,
  useNewMessageSubscription,
} from "@/graphql/hooks";
import { useEffect, useState, useRef } from "react";
import MessageCard from "./MessageCard";
import RepliedMessagePop from "./RepliedMessagePop";
import { differenceInMinutes, format } from "date-fns";
import { fr } from "date-fns/locale";

export type repliedMessage = {
  repliedMessageId: string;
  content: string;
};

type ConversationProps = {
  user: UserWithoutPassword | null;
  conversationId: string;
  isNew: boolean;
  setIsNew: (value: boolean) => void;
  refetchConversations: () => void;
};

export default function ConversationChat({
  user,
  conversationId,
  isNew,
  setIsNew,
  refetchConversations,
}: ConversationProps) {
  const currentUser = useUserStore((state) => state.user);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string>("");
  const lastCursorRef = useRef<string>("");
  const [newConversationId, setNewConversationId] = useState<string>("");
  const [lastMessageSent, setLastMessageSent] = useState<boolean>(true);
  const [repliedMessage, setRepliedMessage] = useState<repliedMessage>({
    repliedMessageId: "",
    content: "",
  });
  const [cursor, setCursor] = useState<string>("");

  const [addMessage] = useAddMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const markMessageAsRead = async () => {
    const response = await markAsRead({
      variables: { id: conversationId },
    });
    if (response.data?.markAsRead.message === "success") refetchConversations();
  };

  const { data: dataMessageSub } = useNewMessageSubscription({
    variables: { id: conversationId ? conversationId : newConversationId },
    skip: conversationId === "" && newConversationId === "",
    fetchPolicy: "network-only",
  });

  const { data: dataLastMessageRead } = useLastMessageReadSubscription({
    variables: { id: conversationId ? conversationId : newConversationId },
    skip: conversationId === "" && newConversationId === "",
    fetchPolicy: "network-only",
  });

  const { data: dataMessages, loading } = useGetMessagesQuery({
    variables: {
      id: conversationId ? conversationId : newConversationId,
      limit: 30,
      cursor: cursor,
    },
    fetchPolicy: "cache-and-network",
    skip: conversationId == "" && newConversationId == "",
  });

  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const totalMessage = dataMessages?.getMessages.totalCount;
  const hasMore = totalMessage && totalMessage > allMessages.length;

  useEffect(() => {
    if (conversationId) {
      setAllMessages([]);
      lastCursorRef.current = "";
      setCursor("");
    }
  }, [conversationId]);

  // Gère la syncro au montage du composant pour remplir le state allMessages
  useEffect(() => {
    handleClearReplied();
    if (dataMessages?.getMessages.messages && cursor === "") {
      setAllMessages(dataMessages.getMessages.messages as Message[]);
    }
    if (dataMessages?.getMessages.messages && cursor !== "") {
      setAllMessages(
        (prev) => [...prev, ...dataMessages.getMessages.messages] as Message[]
      );
    }
    if (
      dataMessages &&
      dataMessages.getMessages &&
      !dataMessages.getMessages.messages[0]?.readAt &&
      dataMessages.getMessages.messages[0]?.sender.id !==
        currentUser?.id.toString()
    ) {
      markMessageAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMessages]);

  // Gère la syncro avec la subscription
  useEffect(() => {
    if (dataMessageSub && dataMessageSub.newMessage) {
      setAllMessages([dataMessageSub.newMessage, ...allMessages] as Message[]);
    }
    if (
      dataMessageSub &&
      dataMessageSub.newMessage &&
      dataMessageSub.newMessage.receiver.id.toString() ===
        currentUser?.id.toString()
    ) {
      markMessageAsRead();
    }
    if (messagesContainerRef && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMessageSub]);

  // Gère la subscription pour savoir si le dernier message a été lu
  useEffect(() => {
    if (dataLastMessageRead && dataLastMessageRead.lastMessageRead) {
      const newMessage = allMessages.map((message: Message) => {
        if (message.id === dataLastMessageRead.lastMessageRead) {
          return {
            ...message,
            readAt: new Date(),
          };
        }
        return message;
      });
      setAllMessages(newMessage as Message[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLastMessageRead]);

  const data = {
    senderId: currentUser?.id.toString() as string,
    receiverId: user?.id as string,
    isNew,
    conversationId: conversationId ? conversationId : newConversationId,
    content: input,
    repliedMessageId: repliedMessage.repliedMessageId,
  };

  const handleSaveMessage = async () => {
    try {
      setLastMessageSent(false);
      const response = await addMessage({
        variables: {
          data,
        },
      });
      handleClearReplied();
      if (isNew) {
        setNewConversationId(response.data?.addMessages ?? "");
        setIsNew(false);
      } else {
        refetchConversations();
      }
      setLastMessageSent(true);
      setInput("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  useEffect(() => {
    refetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newConversationId]);

  const lastMessageReadIndex = getLastReadMessageIndex(
    allMessages as Message[],
    currentUser?.id.toString() as string
  );

  const handleClearReplied = () => {
    setRepliedMessage({
      repliedMessageId: "",
      content: "",
    });
  };

  const { ref, inView } = useInView({
    rootMargin: "500px",
  });

  useEffect(() => {
    if (inView && allMessages.length > 0) {
      const lastMessage = allMessages.at(-1);
      if (lastMessage && lastMessage.id !== lastCursorRef.current) {
        lastCursorRef.current = lastMessage.id;
        setCursor(lastMessage.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="relative h-full w-full flex flex-col-reverse">
      <section className="bg-transparent w-full flex gap-2 items-center px-2 pb-2">
        <Input
          placeholder="Votre message ..."
          className="rounded-full focus-visible:ring-primary"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (input.length === 0) {
              setInput(e.target.value.toUpperCase());
            } else {
              setInput(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.length > 0) {
              e.preventDefault();
              handleSaveMessage();
            }
          }}
        />
        <Tooltip
          content="Envoyer"
          showArrow={true}
          color="foreground"
          className="text-xs"
        >
          <div
            className={`p-2 bg-primary rounded-full hover:bg-blue-600 cursor-pointer transition duration-200 ease-in-out ${
              input.length > 0 ? "scale-100" : "scale-0"
            }`}
            onClick={handleSaveMessage}
          >
            <SendHorizontal
              className={`text-white transition duration-200 ease-in-out ${
                input.length > 0 ? "rotate-0" : "rotate-90"
              }`}
              size={20}
            />
          </div>
        </Tooltip>
      </section>
      {repliedMessage.repliedMessageId && (
        <div className="pl-2 pr-5 mb-1 w-[90%]">
          <RepliedMessagePop
            onClear={handleClearReplied}
            user={user}
            content={repliedMessage.content}
          />
        </div>
      )}
      <section
        ref={messagesContainerRef}
        className="w-full h-full flex flex-col-reverse gap-1 overflow-y-scroll p-4"
      >
        {!isNew &&
          allMessages?.map((message, i) => {
            const isSentByCurrentUser =
              message?.sender?.id === currentUser?.id.toString();
            const isRead = message?.readAt !== null;
            const markAsRead = i === lastMessageReadIndex;
            return (
              <div key={message?.id}>
                {differenceInMinutes(
                  message?.createdAt,
                  allMessages[i + 1]?.createdAt
                ) > 60 ? (
                  <p className="w-full flex justify-center items-center py-4 text-xs text-gray-300">
                    {format(message?.createdAt, "d MMM, HH:mm", { locale: fr })}
                  </p>
                ) : null}
                <MessageCard
                  message={message as Message}
                  user={user}
                  isSentByCurrentUser={isSentByCurrentUser}
                  isRead={isRead}
                  markAsRead={markAsRead}
                  lastMessageSent={lastMessageSent}
                  index={i}
                  setRepliedMessage={setRepliedMessage}
                />
                {hasMore && !loading && i === allMessages.length - 1 && (
                  <section
                    ref={ref}
                    className="w-full h-[50px] flex justify-center items-center"
                  />
                )}
              </div>
            );
          })}
      </section>
      {user && (
        <section className="sticky top-0 w-full flex items-center justify-start bg-white shadow-sm p-4">
          <User
            avatarProps={{
              src: user.avatar ? `${uploadURL + user.avatar}` : imgDefault,
            }}
            name={user.firstname + " " + user.lastname}
          />
        </section>
      )}
    </section>
  );
}
