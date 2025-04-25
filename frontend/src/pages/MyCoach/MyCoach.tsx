import CoachCard from "@/components/CoachCard";
import UserCard from "@/components/UserCard";
import {
  useGetCoachQuery,
  useGetRequestQuery,
  useGetSentQuery,
  useSelectCoachQuery,
} from "@/graphql/hooks";
import { useUserStore } from "@/services/zustand/userStore";
import { Receiver, Sender } from "@/type";
import { Chip, Tabs, Tab, Progress } from "@heroui/react";
import {
  PlaneTakeoff,
  Search,
  User,
} from "lucide-react";
import { Key, useEffect, useState } from "react";
import SearchCoach from "./components/SearchCoach";
import { useLocation } from "react-router-dom";

export default function MyCoach() {
  const currentUser = useUserStore((state) => state.user);
  const location = useLocation();
  const [formSearch, setFormSearch] = useState({
    input: "",
    price: [10, Number.MAX_VALUE],
    categorie: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const input = params.get("input") || "";
    const priceParam = params.get("price");
    const price = priceParam ? priceParam.split(",").map(Number) : [];
    const categorie = params.get("categorie") || "";
    setFormSearch({
      input,
      price,
      categorie,
    });
  }, [location]);

  const {
    data: dataCoach,
    loading: loadingCoach,
    refetch: refetchMyCoach,
  } = useGetCoachQuery({
    variables: { id: currentUser ? currentUser.id.toString() : "" },
    fetchPolicy: "cache-and-network",
  });
  const {
    data: dataSelectCoach,
    loading: loadingSelectCoach,
    refetch: refetchCoach,
  } = useSelectCoachQuery({
    variables: {
      id: currentUser?.id.toString() as string,
      input: formSearch.input,
      price: formSearch.price[1] !== Number.MAX_VALUE ? formSearch.price : [],
      categorie: formSearch.categorie,
    },
    fetchPolicy: "cache-and-network",
  });
  const {
    data: dataRequest,
    loading: loadingRequest,
    refetch: refetchRequest,
  } = useGetRequestQuery({
    variables: {
      id: currentUser?.id.toString() as string,
    },
    fetchPolicy: "cache-and-network",
  });
  const {
    data: dataSent,
    loading: loadingSent,
    refetch: refetchSent,
  } = useGetSentQuery({
    variables: {
      id: currentUser?.id.toString() as string,
    },
    fetchPolicy: "cache-and-network",
  });

  const refetch = {
    refetchMyCoach,
    refetchCoach,
    refetchSent,
    refetchRequest,
  };

  const [valueLoading, setValueLoading] = useState<number>(0);
  useEffect(() => {
    const loadingStates = [
      loadingCoach,
      loadingSelectCoach,
      loadingRequest,
      loadingSent,
    ];
    const activeLoadings = loadingStates.filter((loading) => !loading).length;
    const percentage = (activeLoadings / loadingStates.length) * 100;
    setValueLoading(percentage);
  }, [loadingCoach, loadingSelectCoach, loadingRequest, loadingSent]);

  const myCoach =
    dataCoach && dataCoach?.getUserById && dataCoach.getUserById.coach;
  const allCoach = dataSelectCoach?.selectCoach ?? [];
  const myRequests = dataRequest?.getRequest ?? [];
  const mySent = dataSent?.getSent ?? [];

  const options = [
    {
      id: "search",
      label: (
        <div className="flex items-center space-x-2">
          <Search size={18} />
          <span>Trouver un coach</span>
        </div>
      ),
    },
    {
      id: "coach",
      label: (
        <div className="flex items-center space-x-2">
          <User size={18} />
          <span>Mon Coach</span>
          <Chip size="sm" variant="faded">
            {myCoach ? "1" : "0"}
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

  const [active, setActive] = useState<string>("plan");
  const handleSelectionChange = (key: Key) => {
    setActive(key as string);
  };

  return (
    <section className="h-full w-full pt-4 pb-4 gap-4 flex justify-center items-start overflow-y-auto">
      <section className="w-[80%] min-h-full py-7 bg-white rounded-2xl flex flex-col justify-start items-center gap-7">
        <section className="relative w-[90%] flex flex-col justify-start items-center gap-8">
          {!loadingCoach &&
          !loadingSelectCoach &&
          !loadingRequest &&
          !loadingSent ? (
            <>
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
              {active === "search" &&
                (!myCoach ? (
                  <section className="flex justify-start items-start flex-wrap w-full gap-2">
                    <div className="w-full flex flex-col justify-center items-end mb-2 gap-1">
                      <SearchCoach loading={loadingSelectCoach} />
                    </div>
                    {allCoach.length > 0 ? (
                      <div className="w-full flex flex-col justify-start items-center gap-10">
                        <div className="w-full">
                          {allCoach.map((c) => (
                            <div key={c.id} className="w-full">
                              <CoachCard coach={c} />
                            </div>
                          ))}
                        </div>
                        {/* <PaginationBar /> */}
                      </div>
                    ) : (
                      <p className="w-full text-center text-xs text-gray-600 mt-10">
                        Aucun coach ne correspond aux critères.
                      </p>
                    )}
                  </section>
                ) : (
                  <p className="w-full justify-start pl-5 text-sm text-gray-600">
                    Vous avez déjà un coach.
                  </p>
                ))}
              {active === "coach" &&
                (myCoach ? (
                  <section className="flex justify-start items-start flex-wrap w-full gap-2">
                    <div className="w-[49%] h-[100px]">
                      <UserCard user={myCoach} refetch={refetch} />
                    </div>
                  </section>
                ) : (
                  <p className="w-full justify-start pl-5 text-sm text-gray-600">
                    Vous n'avez pas encore de coach.
                  </p>
                ))}
              {active === "request" &&
                (myRequests.length > 0 ? (
                  <section className="flex justify-start items-start flex-wrap w-full gap-2">
                    {myRequests.map((c: Sender) => (
                      <div key={c.sender.id} className="w-[49%] h-[100px]">
                        <UserCard
                          user={c.sender}
                          canAccept={true}
                          refetch={refetch}
                          requestId={c.id}
                        />
                      </div>
                    ))}
                  </section>
                ) : (
                  <p className="w-full justify-start pl-5 text-sm text-gray-600">
                    Vous n'avez aucune demande en cours.
                  </p>
                ))}
              {active === "pending" &&
                (mySent.length > 0 ? (
                  <section className="flex justify-start items-start flex-wrap w-full gap-2">
                    {mySent.map((c: Receiver) => (
                      <div key={c.receiver.id} className="w-[49%] h-[100px]">
                        <UserCard user={c.receiver} refetch={refetch} />
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
            <section className="absolute top-20 w-full flex justify-center items-center">
              <Progress
                aria-label="Loading..."
                className="max-w-md"
                size="sm"
                value={valueLoading}
              />
            </section>
          )}
        </section>
      </section>
    </section>
  );
}
