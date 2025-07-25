import { Navigate } from "react-router-dom";
import { useUserStore } from "./zustand/userStore";
import { UserRole } from "@/graphql/hooks";
import { PermissionKey } from "./constants";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: UserRole;
  permission?: PermissionKey;
}

const ProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole,
  permission,
}) => {
  const currentUser = useUserStore((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !currentUser.roles.includes(requiredRole)) {
    return <Navigate to="/denied" replace />;
  }

  if (
    permission &&
    !currentUser.profile?.permissions.some((p) => p.key === permission)
  ) {
    return <Navigate to="/denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
