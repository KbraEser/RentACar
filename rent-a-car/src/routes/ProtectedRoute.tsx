import { useAppSelector } from "../app/hooks/storeHooks";
import type { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.user);

  return isAuthenticated ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default ProtectedRoute;
