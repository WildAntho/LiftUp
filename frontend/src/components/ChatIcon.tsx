import {
  useGetTotalUnreadMessageQuery,
  useNewMessageSubscription,
  useTotalUnreadMessageSubSubscription,
} from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { Tooltip } from "@heroui/tooltip";
import { MessagesSquare, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserAvatar from "./UserAvatar";

export default function ChatIcon() {
  const currentUser = useUserStore((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: dataUnreadMessage } = useGetTotalUnreadMessageQuery({
    fetchPolicy: "no-cache",
  });
  const { data: dataNewMessage } = useNewMessageSubscription({
    variables: {
      userId: currentUser?.id.toString() as string,
    },
  });
  const { data: dataUnreadMessageSub } = useTotalUnreadMessageSubSubscription({
    variables: { id: currentUser?.id.toString() as string },
  });

  const newMessage = dataNewMessage && dataNewMessage.newMessage;
  const unreadMessage =
    dataUnreadMessage && dataUnreadMessage.getTotalUnreadMessage;
  const unreadMessageSub =
    dataUnreadMessageSub && dataUnreadMessageSub.totalMessage;
  const [totalMessage, setTotalMessage] = useState<number>(0);

  useEffect(() => {
    if (unreadMessageSub || unreadMessageSub === 0) {
      setTotalMessage(unreadMessageSub);
    } else if (unreadMessage) {
      setTotalMessage(unreadMessage);
    }
  }, [unreadMessageSub, unreadMessage]);

  useEffect(() => {
    if (newMessage && pathname !== "/chat") {
      toast("", {
        description: (
          <div className="flex w-full justify-start items-center gap-2">
            <UserAvatar avatar={newMessage.sender.avatar ?? ""} />
            <div className="flex-1">
              <p className="font-semibold text-black">
                {newMessage.sender.firstname + " " + newMessage.sender.lastname}
              </p>
              <p className="text-black w-full line-clamp-3">
                {newMessage.content}
              </p>
            </div>
          </div>
        ),
        action: {
          label: (
            <div
              className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
              onClick={() => toast.dismiss()}
            >
              <X size={18} />
            </div>
          ),
          onClick: () => console.log("Undo"),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  return (
    <div className="relative cursor-pointer">
      <Tooltip
        placement="left"
        content="Messagerie"
        showArrow={true}
        color="foreground"
        className="text-xs"
      >
        <div
          className="hover:bg-black/5 p-2 rounded-full cursor-pointer"
          onClick={() => navigate("/chat")}
        >
          <MessagesSquare className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </div>
      </Tooltip>
      {totalMessage > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {totalMessage}
        </span>
      )}
    </div>
  );
}
