import MyProfile from "./components/MyProfile";
import { FaQuestionCircle } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaChalkboardUser } from "react-icons/fa6";
import { TbBrandStripeFilled } from "react-icons/tb";
import { TbCoinEuroFilled } from "react-icons/tb";
import { useState, Key, useEffect } from "react";
import About from "./components/Coach/About";
import { Tab, Tabs } from "@heroui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import NotificationPreference from "./components/Notification/NotificationPreference";
import { useRole } from "@/services/hooks/useRole";
import { CoachProfile, useGetMyProfileQuery, UserRole } from "@/graphql/hooks";
import Invoices from "./components/Invoices/Invoices";
import Stripe from "./components/Stripe/Stripe";
import ProtectedRoute from "@/services/ProtectedRoutes";
import { PERMISSIONS } from "@/services/constants";
import { useHasPermission } from "@/services/hooks/hasPermission";

export default function Profile() {
  const isCoach = useRole(UserRole.Coach);
  const canSell = useHasPermission(PERMISSIONS.MANAGE_PROGRAM);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "informations";
  const [active, setActive] = useState<string>(tabFromUrl);

  const {
    data: dataProfile,
    loading: loadingProfile,
    refetch,
  } = useGetMyProfileQuery({
    skip: !isCoach,
  });

  const profile = dataProfile?.getCoachProfile || null;

  useEffect(() => {
    if (tabFromUrl !== active) {
      setActive(tabFromUrl);
    }
  }, [tabFromUrl]);

  const navigation = [
    {
      key: "informations",
      label: "Mon profil",
      icon: <FaChalkboardUser size={24} />,
    },
    ...(isCoach
      ? [
          {
            key: "about",
            label: "A propos",
            icon: <FaQuestionCircle size={24} />,
          },
        ]
      : []),
    {
      key: "notifications",
      label: "Notifications",
      icon: <IoNotifications size={24} />,
    },
    {
      key: "billing",
      label: "Facturation",
      icon: <TbCoinEuroFilled size={24} />,
    },
    ...(isCoach && canSell
      ? [
          {
            key: "stripe",
            label: "Vendre sur Liftup",
            icon: <TbBrandStripeFilled size={24} />,
          },
        ]
      : []),
  ];

  const handleSelectionChange = (key: Key) => {
    setActive(key as string);
    navigate(`?tab=${key}`, { replace: true });
  };

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <section className="h-full w-full pt-8 px-10 flex flex-col items-start justify-start bg-white rounded-2xl">
        <div className="min-w-[30%] p-0">
          <Tabs
            selectedKey={active}
            onSelectionChange={handleSelectionChange}
            fullWidth={true}
            variant="underlined"
            classNames={{
              tabList: "p-0",
              tab: "text-gray-400 data-[selected=true]:text-black",
              tabContent: "group-data-[selected=true]:text-black text-gray-400",
              cursor: "bg-black",
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
            {active === "about" && isCoach && (
              <ProtectedRoute requiredRole={UserRole.Coach}>
                <About
                  profile={profile as CoachProfile}
                  loading={loadingProfile}
                  refetch={refetch}
                />
              </ProtectedRoute>
            )}
            {active === "notifications" && <NotificationPreference />}
            {active === "billing" && <Invoices />}
            {active === "stripe" && isCoach && canSell && (
              <ProtectedRoute
                requiredRole={UserRole.Coach}
                permission={PERMISSIONS.MANAGE_PROGRAM}
              >
                <Stripe profile={profile as CoachProfile} refetch={refetch}/>
              </ProtectedRoute>
            )}
          </section>
        </section>
      </section>
    </section>
  );
}
