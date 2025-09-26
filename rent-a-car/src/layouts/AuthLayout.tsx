import { Outlet, Navigate, Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks/storeHooks";
import type { RootState } from "../store/store";

const AuthLayout = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="navbar-logo text-4xl text-center">CarRental</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
        <div className="mt-4 text-gray-200 text-center">
          <Link to="/">Ana Sayfaya Dön</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
