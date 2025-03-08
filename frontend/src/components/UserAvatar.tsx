import { uploadURL } from "@/services/utils";
import { Avatar } from "@heroui/react";
import imgDefault from "../../public/default.jpg";

type UserAvatarProps = {
  size?: "lg" | "sm" | "md" | undefined;
  className?: string;
  radius?: "lg" | "sm" | "md" | "none" | "full" | undefined;
  avatar?: string | undefined;
};

export default function UserAvatar({
  size = "md",
  className = "",
  radius,
  avatar,
}: UserAvatarProps) {
  const avatarSrc = avatar ? `${uploadURL + avatar}` : imgDefault;

  return (
    <Avatar src={avatarSrc} radius={radius} size={size} className={className} />
  );
}
