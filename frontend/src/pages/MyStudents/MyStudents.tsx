import {
  useGetTotalRequestsQuery,
  useGetTotalStudentsQuery,
} from "@/graphql/hooks";
import { MessageCircleQuestion, Users } from "lucide-react";
import { Chip, Tab, Tabs } from "@heroui/react";
import { Key, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabStudents from "./TabStudents";
import TabRequests from "./TabRequests";

export default function MyStudents() {
  const { data: dataTotalStudent, refetch: refetchTotal } =
    useGetTotalStudentsQuery();
  const refetch = {
    refetchTotal,
  };

  const { data: dataTotalRequests, refetch: refetchTotalRequest } =
    useGetTotalRequestsQuery();

  const totalStudents = dataTotalStudent?.getTotalStudents;
  const totalRequests = dataTotalRequests?.getTotalRequests;

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
            {totalRequests}
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

  useEffect(() => {
    if (urlTab) setActive(urlTab);
  }, [urlTab]);

  return (
    <section className="h-full w-full pt-4 pb-4 gap-4 flex justify-center items-start overflow-y-scroll">
      <section className="w-[85%] min-h-full bg-white rounded-2xl flex flex-col justify-start items-center gap-5">
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
          <>
            {active === "students" && (
              <div className="w-full pb-4">
                <TabStudents refetch={refetch} />
              </div>
            )}
            {active === "request" && (
              <div className="w-full pb-4">
                <TabRequests
                  refetchTotal={refetchTotalRequest}
                  refetchTotalStudents={refetchTotal}
                />
              </div>
            )}
          </>
        </section>
      </section>
    </section>
  );
}
