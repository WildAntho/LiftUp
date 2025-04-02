import {
  UserWithoutPassword,
  useUserStore,
} from "@/services/zustand/userStore";
import ConversationChat from "./components/ConversationChat";
import {
  Conversation,
  useGetChatUsersQuery,
  useGetConversationsQuery,
  useGetStudentsQuery,
} from "@/graphql/hooks";
import { Tooltip } from "@heroui/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AtSign, SquarePen } from "lucide-react";
import ChatModal from "@/components/modals/ChatModal";
import UserConversation from "./components/UserConversation";

export default function Chat() {
  const currentUser = useUserStore((state) => state.user);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Récupère l'utilisateur cliqué
  const [activeUser, setActiveUser] = useState<UserWithoutPassword | null>(
    null
  );
  // Récupère l'id de la conversation si elle existe
  const [conversationId, setConversationId] = useState<string>("");
  // Permet de savoir si un chat est nouveau ou si une conversation existe déjà entre 2 utilisateurs
  const [isNew, setIsNew] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const { data: dataConversation, refetch: refetchConversations } =
    useGetConversationsQuery({
      fetchPolicy: "cache-and-network",
    });
  const allConversations = dataConversation?.getConversations ?? [];

  const { data: dataStudents } = useGetStudentsQuery({
    variables: {
      id: currentUser?.id.toString() as string,
      input: search,
    },
    skip: currentUser?.roles !== "COACH",
  });
  const { data: dataUsers } = useGetChatUsersQuery({
    fetchPolicy: "cache-and-network",
    skip: currentUser?.roles !== "STUDENT",
  });
  const allStudents = dataStudents?.getStudents.students ?? [];
  const allUsers = dataUsers?.getChatUsers ?? [];
  const userSelect = currentUser?.roles === "COACH" ? allStudents : allUsers;

  useEffect(() => {
    if (activeUser) {
      const existingConversation = allConversations.find((conv) =>
        conv.participants.some((p) => p.id === activeUser.id)
      );
      if (existingConversation) {
        setIsNew(false);
        setConversationId(existingConversation.id);
      } else {
        setConversationId("");
        setIsNew(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <section className="h-full p-4 gap-4 flex justify-start align-items-center">
      <ChatModal
        open={openModal}
        onClose={handleClose}
        users={userSelect as UserWithoutPassword[]}
        setActiveUser={setActiveUser}
        setSearch={setSearch}
      />
      <section className="flex flex-col justify-start items-start bg-white rounded-2xl h-full w-[400px]">
        <section className="w-full flex flex-col items-start justify-start">
          <div className="w-full px-6 pt-6 pb-2">
            <div className="w-full flex justify-between items-center mb-2">
              <p className="font-semibold">Conversations</p>
              <Tooltip
                content="Démarrer une nouvelle conversation"
                showArrow={true}
                color="foreground"
                className="text-xs"
              >
                <div
                  className="hover:bg-black/5 py-2 rounded-full cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <SquarePen
                    size={20}
                    className="text-black active:text-gray-500"
                  />
                </div>
              </Tooltip>
            </div>
            <Separator />
          </div>
          <section className="w-full flex flex-col items-start justify-start">
            {allConversations.map((conversation) => (
              <Button
                key={conversation.id}
                className={`w-full flex items-center justify-start py-2 px-4 shadow-none ${
                  activeUser?.id === conversation.participants[0].id
                    ? "bg-primary bg-opacity-10 w-full hover:bg-primary hover:bg-opacity-10 text-primary justify-start gap-2"
                    : "bg-white text-black hover:bg-primary hover:bg-opacity-5 w-full justify-start gap-2"
                } h-auto rounded-none`}
                onClick={() => {
                  setActiveUser(
                    conversation.participants[0] as UserWithoutPassword
                  );
                  setIsNew(false);
                  setConversationId(conversation.id);
                }}
              >
                <UserConversation
                  conversation={conversation as Conversation}
                  refetch={refetchConversations}
                  currentConversationId={conversationId}
                />
              </Button>
            ))}
          </section>
        </section>
      </section>
      <section className="min-h-full flex-1 bg-white rounded-2xl overflow-hidden">
        {!activeUser ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-2">
            <div className="flex justify-center items-center border-3 border-gray-500 p-4 rounded-full">
              <AtSign size={46} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-semibold">Vos messages</p>
              {currentUser?.roles === "COACH" && (
                <p className="text-sm">
                  Envoyez des messages privés à vos élèves
                </p>
              )}
              {currentUser?.roles === "STUDENT" && (
                <p className="text-sm">
                  Envoyez des messages privés à votre coach ou des membres de
                  votre équipe
                </p>
              )}
            </div>
            <Button
              className="bg-primary hover:bg-blue-600 my-4"
              onClick={() => setOpenModal(true)}
            >
              Envoyer un message
            </Button>
          </div>
        ) : (
          <ConversationChat
            user={activeUser}
            conversationId={conversationId}
            isNew={isNew}
            setIsNew={setIsNew}
            refetchConversations={refetchConversations}
          />
        )}
      </section>
    </section>
  );
}
