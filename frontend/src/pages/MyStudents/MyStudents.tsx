import {
  Request,
  useGetRequestQuery,
  useGetSentQuery,
  useGetTotalStudentsQuery,
} from "@/graphql/hooks";
import {
  Loader2,
  MessageCircleQuestion,
  PlaneTakeoff,
  Users,
} from "lucide-react";
import { Chip, Tab, Tabs } from "@heroui/react";
import { useUserStore } from "@/services/zustand/userStore";
import { Key, useState } from "react";
import { Receiver } from "@/type";
import UserCard from "@/components/UserCard";
import { useLocation, useNavigate } from "react-router-dom";
import TabStudents from "./TabStudents";
import TabRequests from "./TabRequests";

export default function MyStudents() {
  const currentUser = useUserStore((state) => state.user);
  const { data: dataTotalStudent, refetch: refetchTotal } = useGetTotalStudentsQuery();
  const {
    data: dataRequest,
    loading: loadingRequest,
    refetch: refetchRequest,
  } = useGetRequestQuery({
    variables: {
      id: currentUser ? currentUser.id.toString() : "",
    },
    fetchPolicy: "no-cache",
  });
  const {
    data: dataSent,
    loading: loadingSent,
    refetch: refetchSent,
  } = useGetSentQuery({
    variables: {
      id: currentUser ? currentUser.id.toString() : "",
    },
    fetchPolicy: "cache-and-network",
  });

  const refetch = {
    refetchSent,
    refetchRequest,
    refetchTotal
  };

  const totalStudents = dataTotalStudent?.getTotalStudents;
  const myRequests = dataRequest?.getRequest ?? [];
  const mySent = dataSent?.getSent ?? [];

  // Navigation options
  const options = [
    {
      id: "students",
      label: (
        <div className="flex items-center space-x-2">
          <Users size={18} />
          <span>Mes élèves</span>
          <Chip size="sm" variant="faded">
            {totalStudents}
          </Chip>
        </div>
      ),
    },
    {
      id: "request",
      label: (
        <div className="flex items-center space-x-2">
          <MessageCircleQuestion size={18} />
          <span>Mes demandes reçus</span>
          <Chip size="sm" variant="faded">
            {myRequests.length}
          </Chip>
        </div>
      ),
    },
    {
      id: "pending",
      label: (
        <div className="flex items-center space-x-2">
          <PlaneTakeoff size={18} />
          <span>Mes demandes envoyées</span>
          <Chip size="sm" variant="faded">
            {mySent.length}
          </Chip>
        </div>
      ),
    },
  ];

  // Utilisation de React Router pour gérer l'URL
  const location = useLocation();
  const navigate = useNavigate();
  const urlTab = new URLSearchParams(location.search).get("tab");

  // Active options
  const [active, setActive] = useState<string>(urlTab || "students");
  const handleSelectionChange = (key: Key) => {
    setActive(key as string);
    navigate(`?tab=${key}`);
  };

  return (
    <section className="h-full w-full pt-4 pb-4 gap-4 flex justify-center items-center">
      <section className="w-[80%] h-full bg-white rounded-2xl flex flex-col justify-start items-center overflow-y-scroll gap-5">
        <section className="w-[90%] flex justify-between items-center p-5">
          <div className="w-full flex justify-between items-center">
            <Tabs
              aria-label="Options"
              color="primary"
              size="md"
              variant="underlined"
              className="w-full"
              selectedKey={active}
              onSelectionChange={handleSelectionChange}
            >
              {options.map((s) => (
                <Tab key={s.id} title={s.label} />
              ))}
            </Tabs>
          </div>
        </section>
        <section className="w-[90%] flex flex-col justify-start items-center gap-10">
          {!loadingRequest || loadingSent ? (
            <>
              {active === "students" && (
                <div className="w-full pb-4">
                  <TabStudents refetch={refetch}/>
                </div>
              )}
              {active === "request" && (
                <div className="w-full pb-4">
                  <TabRequests
                    refetch={refetch}
                    requests={myRequests as Request[]}
                  />
                </div>
              )}
              {active === "pending" &&
                (mySent.length > 0 ? (
                  <section className="flex justify-start items-start flex-wrap w-full gap-2">
                    {mySent.map((s: Receiver) => (
                      <div key={s.receiver.id} className="w-[49%] h-[100px]">
                        <UserCard user={s.receiver} />
                      </div>
                    ))}
                  </section>
                ) : (
                  <p className="w-full justify-start pl-5 text-sm text-gray-600">
                    Vous n'avez envoyé aucune demande.
                  </p>
                ))}
            </>
          ) : (
            <section>
              <Loader2 className="animate-spin" />
            </section>
          )}
        </section>
      </section>
    </section>
  );
}
