import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
// import ErrorPage from "../pages/ErrorPage";
import HomePage from "../components/HomePage";
import {
  fetchAllCars,
  fetchFeaturedCars,
  fetchCarById,
} from "../services/carService";

import CarCard from "../components/CarCard";
import CarDetailsModel from "../components/CarDetailsModal";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import Dashboard from "../components/dashboard/Dashboard";
export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          return await fetchFeaturedCars();
        },
      },
      {
        path: "cars",
        element: <CarCard />,
        loader: async () => {
          return await fetchAllCars();
        },
      },
      {
        path: "cars/carsDetail/:id",
        element: <CarDetailsModel />,
        loader: async ({ params }) => {
          return await fetchCarById(Number(params.id));
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "cars",
        element: <CarCard />,
        loader: async () => {
          return await fetchAllCars();
        },
      },
      {
        path: "cars/:id",
        element: <CarDetailsModel />,
        loader: async ({ params }) => {
          return await fetchCarById(Number(params.id));
        },
      },
      {
        path: "reservations",
        element: (
          <div className="space-y-6">
            <div
              className="rounded-lg shadow-lg p-6"
              style={{ backgroundColor: "var(--color-white)" }}
            >
              <h1
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--color-gray-800)" }}
              >
                Rezervasyonlarım
              </h1>
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-16 w-16 mb-4"
                  style={{ color: "var(--color-gray-400)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--color-gray-800)" }}
                >
                  Henüz rezervasyon yok
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-gray-600)" }}
                >
                  İlk rezervasyonunuzu yapmak için araçları inceleyin.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: "profile",
        element: (
          <div className="space-y-6">
            <div
              className="rounded-lg shadow-lg p-6"
              style={{ backgroundColor: "var(--color-white)" }}
            >
              <h1
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--color-gray-800)" }}
              >
                Profil Ayarları
              </h1>
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-16 w-16 mb-4"
                  style={{ color: "var(--color-gray-400)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--color-gray-800)" }}
                >
                  Profil sayfası geliştiriliyor
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-gray-600)" }}
                >
                  Yakında hesap bilgilerinizi düzenleyebileceksiniz.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
]);
