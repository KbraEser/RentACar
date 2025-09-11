import { useAppSelector } from "../app/hooks/storeHooks";
import type { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
