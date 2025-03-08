import { useUserStore } from "@/services/zustand/userStore";
import Calendar from "./components/Calendar";
import HomeSidebar from "./components/HomeSidebar";

export default function Home() {
  const currentUser = useUserStore((state) => state.user);
  return (
    <section className="h-full p-4 gap-4 flex justify-start align-items-center">
      <HomeSidebar currentUser={currentUser} />
      <Calendar currentUser={currentUser} />
    </section>
  );
}
