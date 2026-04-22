import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const accessTokenData = useAuthStore((state) => state.accessTokenData);
  if (!accessTokenData) return <Navigate to={"/"} replace/>;
  return <Outlet />;
}

export default ProtectedRoute;
