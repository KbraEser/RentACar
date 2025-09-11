import { supabase } from "../lib/supabaseClient";
import type { Car } from "../types/car";

export const fetchCarsService = async (): Promise<Car[]> => {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) throw new Error(error.message);
  return data as Car[];
};

export const fetchCarByIdService = async (id: number): Promise<Car | null> => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data as Car;
};
