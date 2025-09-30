import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slices/carSlice";
import authReducer from "./slices/authSlice";
import rentalsReducer from "./slices/rentalsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    // user: userReducer,
    rentals: rentalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
