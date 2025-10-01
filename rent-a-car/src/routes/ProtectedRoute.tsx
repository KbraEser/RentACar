import { useAppSelector } from "../app/hooks/storeHooks";
import type { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.user);
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Kimlik doğrulanıyor..." />
      </div>
    );
  }

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
