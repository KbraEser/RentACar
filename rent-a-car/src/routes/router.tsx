import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import ErrorPage from "../pages/ErrorPage";
import HomePage from "../components/HomePage";
import {
  fetchAllCars,
  fetchFeaturedCars,
  fetchCarById,
} from "../services/carService";

import CarCard from "../components/CarCard";
import CarDetailsModel from "../components/CarDetailsModal";

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
]);
