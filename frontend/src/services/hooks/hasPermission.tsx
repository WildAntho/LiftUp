import { PermissionKey } from "../constants";
import { useUserStore } from "../zustand/userStore";

type Mode = "OR" | "AND";

export function useHasPermission(
  permissions: PermissionKey | PermissionKey[],
  mode: Mode = "OR"
): boolean {
  const currentUser = useUserStore((state) => state.user);

  if (!currentUser?.profile?.permissions) return false;

  const userPermissionKeys = currentUser.profile.permissions.map((p) => p.key);

  const requiredPermissions = Array.isArray(permissions)
    ? permissions
    : [permissions];

  if (mode === "AND") {
    return requiredPermissions.every((perm) =>
      userPermissionKeys.includes(perm)
    );
  }

  return requiredPermissions.some((perm) =>
    userPermissionKeys.includes(perm)
  );
}
