import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slices/carSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    // user: userReducer,
    // rental: rentalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
