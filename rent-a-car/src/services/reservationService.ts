import { supabase } from "../lib/supabaseClient";

export const createReservationService = async (
  userId: string,
  carId: string,
  startDate: string,
  endDate: string,
  totalPrice: number
) => {
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
      },
    ])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchReservationsService = async (userId: string) => {
  const { data, error } = await supabase
    .from("rentals")
    .select("id,user_id,car_id,start_date,end_date,total_price,status")
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
