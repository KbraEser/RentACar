import { supabase } from "../lib/supabaseClient";
import {
  handleError,
  validateInput,
  validateDateRange,
} from "../utils/errorHandler";

export const createReservationService = async (
  userId: string,
  carId: string,
  startDate: string,
  endDate: string,
  totalPrice: number,
  city: string
) => {
  // Input validation
  validateInput(userId, "User ID");
  validateInput(carId, "Car ID");
  validateInput(startDate, "Start Date");
  validateInput(endDate, "End Date");
  validateInput(totalPrice, "Total Price");
  validateInput(city, "City");
  // Date range validation
  validateDateRange(startDate, endDate);

  const { data, error } = await supabase
    .from("rentals")
    .insert([
      {
        user_id: userId,
        car_id: carId,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        status: "active",
        city: city,
      },
    ])
    .select();

  if (error) {
    throw new Error(handleError(error, "ReservationService.createReservation"));
  }

  return data;
};

export const fetchReservationsService = async (userId: string) => {
  // Input validation
  validateInput(userId, "User ID");

  const { data, error } = await supabase
    .from("rentals")
    .select("id,user_id,car_id,start_date,end_date,total_price,status,city")
    .eq("user_id", userId);

  if (error) {
    throw new Error(handleError(error, "ReservationService.fetchReservations"));
  }

  return data;
};
