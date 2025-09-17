import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import ErrorPage from "../pages/ErrorPage";
import HomePage from "../components/HomePage";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
