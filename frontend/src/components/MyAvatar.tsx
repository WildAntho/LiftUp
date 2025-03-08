import { uploadURL } from "@/services/utils";
import { useUserStore } from "@/services/zustand/userStore";
import { Avatar } from "@heroui/react";
import imgDefault from "../../public/default.jpg";

type MyAvatarProps = {
  size?: "lg" | "sm" | "md" | undefined;
  className?: string;
  radius?: "lg" | "sm" | "md" | "none" | "full" | undefined;
  avatar?: string | undefined;
};

export default function MyAvatar({
  size = "md",
  className = "",
  radius,
}: MyAvatarProps) {
  const currentUser = useUserStore((state) => state.user);
  const avatarSrc = currentUser?.avatar
    ? `${uploadURL + currentUser?.avatar}`
    : imgDefault;

  return (
    <Avatar src={avatarSrc} radius={radius} size={size} className={className} />
  );
}
