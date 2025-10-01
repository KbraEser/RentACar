import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useAppDispatch } from "./app/hooks/storeHooks";
import { useEffect } from "react";
import { getSession } from "./store/slices/authSlice";
import ErrorBoundary from "./components/common/ErrorBoundary";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
