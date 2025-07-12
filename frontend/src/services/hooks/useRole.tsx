import { UserRole } from "@/graphql/hooks";
import { useUserStore } from "../zustand/userStore";


export function useRole(requiredRoles: UserRole | UserRole[]): boolean {
  const currentUser = useUserStore((state) => state.user);

  if (!currentUser?.roles) return false;

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  return roles.some((role) => currentUser.roles.includes(role));
}
