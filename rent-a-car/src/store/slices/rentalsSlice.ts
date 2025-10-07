import type { Rentals } from "../../types/rentals";
import { createReservationService } from "../../services/reservationService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ERROR_MESSAGES } from "../../types/errors";
import type { Car } from "../../types/car";

type RentalsState = {
  rentals: Rentals[];
  loading: boolean;
  error: string | null;
};

const initialState: RentalsState = {
  rentals: [],
  loading: false,
  error: null,
};

export const createReservation = createAsyncThunk(
  "rentals/createReservation",
  async ({ reservation, car }: { reservation: Rentals; car: Car }) => {
    return await createReservationService(reservation, car);
  }
);

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals.push(action.payload[0]);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || ERROR_MESSAGES.RESERVATION_CREATE_FAILED;
      });
  },
});

export default rentalsSlice.reducer;
