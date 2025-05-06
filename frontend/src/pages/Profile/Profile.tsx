import MyProfile from "./components/MyProfile";
import { useUserStore } from "@/services/zustand/userStore";
import { MessageCircleQuestion, NotebookPen, Settings } from "lucide-react";
import { useState, Key, useEffect } from "react";
import About from "./components/About";
import Plans from "./components/Plans";
import { Tab, Tabs } from "@heroui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

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
      icon: <NotebookPen size={18} className="text-red-500" />,
    },
    ...(isCoach
      ? [
          {
            key: "about",
            label: "A propos",
            icon: (
              <MessageCircleQuestion size={18} className="text-green-500" />
            ),
          },
        ]
      : []),
    {
      key: "settings",
      label: "Paramètres",
      icon: <Settings size={18} className="text-dark-500" />,
    },
  ];

  const handleSelectionChange = (key: Key) => {
    setActive(key as string);
    navigate(`?tab=${key}`, { replace: true });
  };
  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <section className="h-full w-full pt-8 px-10 pb-2 flex flex-col items-start justify-start bg-white rounded-2xl">
        <div className="min-w-[50%] pb-4">
          <Tabs
            selectedKey={active}
            onSelectionChange={handleSelectionChange}
            fullWidth={true}
          >
            {navigation.map((n) => (
              <Tab
                key={n.key}
                title={
                  <div className="flex items-center space-x-2">
                    {n.icon}
                    <span>{n.label}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>
        <Separator />
        <section className="h-full w-full overflow-y-scroll flex-1">
          <section className="min-h-full w-full">
            {active === "informations" && <MyProfile />}
            {active === "about" && isCoach && <About />}
            {active === "plans" && isCoach && <Plans />}
          </section>
        </section>
      </section>
    </section>
  );
}
