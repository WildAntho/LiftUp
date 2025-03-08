import { Button } from "@/components/ui/button";
import MyProfile from "./components/MyProfile";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/services/zustand/userStore";
import { BadgeEuro, MessageCircleQuestion, NotebookPen } from "lucide-react";
import { useState } from "react";
import MyAvatar from "@/components/MyAvatar";
import About from "./components/About";
import Offers from "./components/Offers";
import Plans from "./components/Plans";

export default function Profile() {
  const currentUser = useUserStore((state) => state.user);
  const isCoach = currentUser?.roles === "COACH";

  const [active, setActive] = useState<string>("profile");
  const navigation = [
    ...(isCoach
      ? [
          {
            id: 1,
            value: "about",
            label: "A propos",
            icon: <MessageCircleQuestion />,
          },
          {
            id: 2,
            value: "offers",
            label: "Mes offres",
            icon: <BadgeEuro />,
          },
          {
            id: 3,
            value: "plans",
            label: "Mes plans d'entraînements",
            icon: <NotebookPen />,
          },
        ]
      : []),
  ];
  return (
    <section className="h-full p-4 gap-4 flex justify-start align-items-center">
      <section className="flex flex-col justify-start items-start bg-white rounded-2xl h-full w-[300px] p-2">
        <Button
          variant="ghost"
          className={`flex justify-start items-center gap-4 w-full h-auto px-4 py-2 hover:bg-primary hover:bg-opacity-10 hover:text-primary
            ${active === "profile" && "bg-primary bg-opacity-10 text-primary"}`}
          onClick={() => setActive("profile")}
        >
          <MyAvatar />
          <p>{currentUser?.firstname + " " + currentUser?.lastname}</p>
        </Button>
        <Separator className="my-2" />
        <section className="w-full h-full flex flex-col justify-start items-center gap-2">
          {navigation.map((submenu) => (
            <Button
              key={submenu.id}
              variant="ghost"
              className={`flex justify-start items-center gap-4 w-full h-[50px] px-4 py-2 hover:bg-primary hover:bg-opacity-10 hover:text-primary ${
                active === submenu.value &&
                "bg-primary bg-opacity-10 text-primary"
              }`}
              onClick={() => setActive(submenu.value)}
            >
              {submenu.icon}
              {submenu.label}
            </Button>
          ))}
        </section>
      </section>
      <section className="h-full overflow-y-scroll flex-1">
        <section className="min-h-full bg-white rounded-2xl">
          {active === "profile" && <MyProfile />}
          {active === "about" && isCoach && <About />}
          {active === "offers" && isCoach && <Offers />}
          {active === "plans" && isCoach && <Plans />}
        </section>
      </section>
    </section>
  );
}
