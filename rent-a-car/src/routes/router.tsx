import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import ErrorPage from "../pages/ErrorPage";
import HomePage from "../components/HomePage";
import {
  fetchCarsService,
  fetchFeaturedCarsService,
} from "../services/carService";

import CarCard from "../components/CarCard";

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
          return await fetchFeaturedCarsService();
        },
      },
      {
        path: "cars",
        element: <CarCard />,
        loader: async () => {
          return await fetchCarsService();
        },
      },
    ],
  },
]);
