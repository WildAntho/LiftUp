import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "./zustand/userStore";

interface RoleLogoutRouteProps {
  children: JSX.Element;
}

const LogoutRoutes: React.FC<RoleLogoutRouteProps> = ({ children }) => {
  const currentUser = useUserStore((state) => state.user);
  const location = useLocation();
  const path = location.pathname;

  if (
    currentUser &&
    (path === "/login" ||
      path === "/signup" ||
      path === "/signup/coach" ||
      path === "/signup/student")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LogoutRoutes;
