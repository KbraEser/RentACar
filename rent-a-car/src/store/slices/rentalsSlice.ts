import type { Rentals } from "../../types/rentals";
import {
  cancelReservationService,
  createReservationService,
  fetchRentalsService,
} from "../../services/reservationService";
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

export const fetchRentals = createAsyncThunk(
  "rentals/fetchRentals",
  async (user_id: string) => {
    return await fetchRentalsService(user_id);
  }
);

export const cancelReservation = createAsyncThunk(
  "rentals/cancelReservation",
  async (id: string) => {
    return await cancelReservationService(id);
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
      })
      .addCase(fetchRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = action.payload;
      })
      .addCase(fetchRentals.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || ERROR_MESSAGES.RESERVATION_FETCH_FAILED;
      })
      .addCase(cancelReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.loading = false;
        const cancelledId = action.meta.arg;

        // Rezervasyonu bul ve status'unu güncelle
        const rentalIndex = state.rentals.findIndex(
          (rental) => rental.id === cancelledId
        );
        
        if (rentalIndex !== -1) {
          state.rentals[rentalIndex].status = "cancelled";
        }
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || ERROR_MESSAGES.RESERVATION_CANCEL_FAILED;
      });
  },
});

export default rentalsSlice.reducer;
