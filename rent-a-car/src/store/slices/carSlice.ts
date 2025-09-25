import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Car } from "../../types/car";
import {
  fetchCarById as fetchCarByIdService,
  fetchAllCars,
  fetchFeaturedCars as fetchFeaturedCarsService,
} from "../../services/carService";

type CarState = {
  list: Car[];
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
  featuredCars: Car[];
};

const initialState: CarState = {
  list: [],
  selectedCar: null,
  loading: false,
  error: null,
  featuredCars: [],
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  return await fetchAllCars();
});

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id: number) => {
    return await fetchCarByIdService(id);
  }
);

export const fetchFeaturedCars = createAsyncThunk(
  "cars/fetchFeaturedCars",
  async () => {
    return await fetchFeaturedCarsService();
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch car by id";
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.featuredCars = action.payload;
      });
  },
});

export default carSlice.reducer;
