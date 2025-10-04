import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchReservationsService,
  createReservationService,
} from "../../services/reservationService";
import { ERROR_MESSAGES } from "../../types/errors";

interface Rentals {
  id: string;
  user_id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  city: string;
}

interface RentalsState {
  reservations: Rentals[];
  loading: boolean;
  error: string | null;
}

const initialState: RentalsState = {
  reservations: [],
  loading: false,
  error: null,
};

export const fetchReservations = createAsyncThunk(
  "rentals/fetchReservations",
  async (userId: string) => {
    return await fetchReservationsService(userId);
  }
);

export const createReservation = createAsyncThunk(
  "rentals/createReservation",
  async (reservations: Omit<Rentals, "id" | "created_at" | "updated_at">) => {
    return await createReservationService(
      reservations.user_id,
      reservations.car_id,
      reservations.start_date,
      reservations.end_date,
      reservations.total_price,
      reservations.city
    );
  }
);

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = (action.payload as Rentals[]) || [];
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || ERROR_MESSAGES.RESERVATION_FETCH_FAILED;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload[0] as Rentals);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || ERROR_MESSAGES.RESERVATION_CREATE_FAILED;
      });
  },
});

export default rentalsSlice.reducer;
