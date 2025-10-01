import { supabase } from "../lib/supabaseClient";
import type { Car } from "../types/car";
import myLoggerService from "./loggerService";

// Tüm arabaları getir
export const fetchAllCars = async (): Promise<Car[]> => {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) throw new Error(error.message);
  return data as Car[];
};

// Filtrelenmiş arabaları getir - tek fonksiyonla tüm filtreleri yönet
export const fetchFilteredCars = async (
  filters: Record<string, any>
): Promise<Car[]> => {
  let query = supabase.from("cars").select("*");

  // Dinamik filtreleme
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        query = query.in(key, value);
      } else if (typeof value === "number") {
        if (key === "min_price") {
          query = query.gte("price_per_day", value);
        } else if (key === "max_price") {
          query = query.lte("price_per_day", value);
        } else {
          query = query.eq(key, value);
        }
      } else if (typeof value === "string") {
        // String değerler için case-insensitive arama
        query = query.ilike(key, `%${value}%`);
      } else {
        query = query.eq(key, value);
      }
    }
  });

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    myLoggerService.error("Failed to fetch filtered cars", error);
    throw new Error(error.message);
  }

  return data as Car[];
};

// Diğer servisler
export const fetchCarById = async (id: string): Promise<Car | null> => {
  // ID'nin geçerli bir UUID string olduğunu kontrol et
  if (!id || typeof id !== "string" || id.trim() === "") {
    const error = new Error("Invalid car ID");
    myLoggerService.error("Invalid car ID provided", error);
    throw error;
  }

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data as Car;
};

export const fetchFeaturedCars = async (): Promise<Car[]> => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("is_featured", true);
  if (error) throw new Error(error.message);
  return data as Car[];
};
