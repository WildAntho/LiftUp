import MyProfile from "./components/MyProfile";
import { useUserStore } from "@/services/zustand/userStore";
import {
  Bell,
  MessageCircleQuestion,
  NotebookPen,
  Settings,
} from "lucide-react";
import { useState, Key, useEffect } from "react";
import About from "./components/About";
import { Tab, Tabs } from "@heroui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import NotificationPreference from "./components/NotificationPreference";

export default function Profile() {
  const currentUser = useUserStore((state) => state.user);
  const isCoach = currentUser?.roles === "COACH";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "informations";
  const [active, setActive] = useState<string>(tabFromUrl);

  useEffect(() => {
    if (tabFromUrl !== active) {
      setActive(tabFromUrl);
    }
  }, [tabFromUrl]);

  const navigation = [
    {
      key: "informations",
      label: "Mon profil",
      icon: <NotebookPen size={18} />,
    },
    ...(isCoach
      ? [
          {
            key: "about",
            label: "A propos",
            icon: <MessageCircleQuestion size={18} />,
          },
        ]
      : []),
    {
      key: "notifications",
      label: "Notifications",
      icon: <Bell size={18} />,
    },
    {
      key: "settings",
      label: "Paramètres",
      icon: <Settings size={18} />,
    },
  ];

  const handleSelectionChange = (key: Key) => {
    setActive(key as string);
    navigate(`?tab=${key}`, { replace: true });
  };

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <section className="h-full w-full pt-8 px-10 pb-2 flex flex-col items-start justify-start bg-white rounded-2xl">
        <div className="min-w-[30%] pb-0">
          <Tabs
            selectedKey={active}
            onSelectionChange={handleSelectionChange}
            fullWidth={true}
            variant="underlined"
            classNames={{
              tabList: "pb-0",
            }}
          >
            {navigation.map((n) => (
              <Tab
                key={n.key}
                title={
                  <div className="flex items-center space-x-2 pb-2">
                    {n.icon}
                    <span>{n.label}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>
        <div className="w-full flex justify-center items-center">
          <Separator className="w-[97%]" />
        </div>
        <section className="h-full w-full overflow-y-scroll flex-1 pt-4">
          <section className="min-h-full w-full">
            {active === "informations" && <MyProfile />}
            {active === "about" && isCoach && <About />}
            {active === "notifications" && <NotificationPreference />}
          </section>
        </section>
      </section>
    </section>
  );
}
