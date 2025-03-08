import { Tooltip } from "@heroui/react";
import { useUserStore } from "@/services/zustand/userStore";
import { ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MyAvatar from "@/components/MyAvatar";

type UserProfileProps = {
  open: boolean;
};

export default function UserProfile({ open }: UserProfileProps) {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  return (
    <Tooltip
      className="w-full text-xs"
      content="Aller sur mon profil"
      showArrow={true}
      color="foreground"
    >
      <section
        className="hover:bg-gray-500 hover:bg-opacity-20 w-full cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <section className="flex justify-between items-center p-2 w-full">
          <section className="flex justify-center items-center gap-2">
            <MyAvatar />
            <section
              className={`flex flex-col justify-center items-start transition duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <p>{currentUser?.firstname + " " + currentUser?.lastname}</p>
              <p className="opacity-50 text-xs">{currentUser?.email}</p>
            </section>
          </section>
          <ChevronsUpDown
            className={`size-4 mr-3 transition duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
        </section>
      </section>
    </Tooltip>
  );
}
