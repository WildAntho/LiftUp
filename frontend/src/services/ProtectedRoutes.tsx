import { Navigate } from "react-router-dom";
import { useUserStore } from "./zustand/userStore";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const currentUser = useUserStore((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.roles !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
