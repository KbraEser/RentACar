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

// Ortak car loader fonksiyonu
const carLoader = async ({ params }: { params: any }) => {
  try {
    if (
      !params.id ||
      typeof params.id !== "string" ||
      params.id.trim() === ""
    ) {
      throw new Error("Geçersiz araç ID'si");
    }
    return await fetchCarById(params.id);
  } catch (error) {
    throw error;
  }
};

import CarCard from "../components/CarCard";
import CarDetailsModel from "../components/CarDetailsModal";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import Dashboard from "../components/dashboard/Dashboard";
import RezervationForm from "../components/dashboard/reservation/ReservationForm";
import ReservationSuccess from "../components/dashboard/reservation/ReservationSuccess";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

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
        loader: carLoader,
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
        loader: carLoader,
      },
      {
        path: "reservationForm/:id",
        element: <RezervationForm />,
        loader: carLoader,
        children: [
          {
            path: "reservationSuccess",
            element: <ReservationSuccess />,
          },
        ],
      },

      // {
      //   path: "reservations",
      //   element: <ReservationList />,
      // },
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
