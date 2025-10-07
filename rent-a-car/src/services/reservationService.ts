import { supabase } from "../lib/supabaseClient";
import type { Rentals } from "../types/rentals";
import { handleError } from "../utils/errorHandler";
import type { Car } from "../types/car";

export const createReservationService = async (
  reservation: Rentals,
  car: Car
) => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("rentals")
    .insert([
      {
        user_id: reservation.user_id,
        car_id: reservation.car_id,
        start_date: reservation.start_date,
        end_date: reservation.end_date,
        total_price: reservation.total_price,
        city: car.city,

        status: "active",
        created_at: now,
        updated_at: now,
      },
    ])
    .select();

  if (error) {
    throw new Error(
      handleError(error, "ReservationService.createReservationService")
    );
  }
  return data;
};
