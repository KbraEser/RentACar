import { supabase } from "../lib/supabaseClient";
import type { Car } from "../types/car";
import { handleError, validateCarId } from "../utils/errorHandler";

// Tüm arabaları getir
export const fetchAllCars = async (): Promise<Car[]> => {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) {
    throw new Error(handleError(error, "CarService.fetchAllCars"));
  }
  return data as Car[];
};

// Filtrelenmiş arabaları getir
export const fetchFilteredCars = async (
  filters: Record<string, any>
): Promise<Car[]> => {
  let query = supabase.from("cars").select("*");

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      if (key === "startDate") {
        // kiralama başlangıcı => car.available_from >= startDate
        query = query.gte("available_from", value);
      } else if (key === "endDate") {
        // kiralama bitişi => car.available_to <= endDate
        query = query.lte("available_to", value);
      } else if (key === "minPrice") {
        // Minimum fiyat filtresi
        const priceValue = typeof value === "string" ? parseInt(value) : value;
        query = query.gte("price_per_day", priceValue);
      } else if (key === "maxPrice") {
        const priceValue = typeof value === "string" ? parseInt(value) : value;
        query = query.lte("price_per_day", priceValue);
      } else if (Array.isArray(value) && value.length > 0) {
        query = query.in(key, value);
      } else if (typeof value === "string") {
        // String değerler için case-insensitive exact match
        // ilike kullanarak case-insensitive arama yapıyoruz
        query = query.ilike(key, value);
      } else {
        query = query.eq(key, value);
      }
    }
  });

  const { data, error } = await query;

  if (error) {
    throw new Error(handleError(error, "CarService.fetchFilteredCars"));
  }

  return data as Car[];
};

// Diğer servisler
export const fetchCarById = async (id: string): Promise<Car | null> => {
  // ID validation
  validateCarId(id);

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned - car not found
      throw new Error("Araç bulunamadı");
    }
    throw new Error(handleError(error, "CarService.fetchCarById"));
  }

  return data as Car;
};

export const fetchFeaturedCars = async (): Promise<Car[]> => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("is_featured", true);

  if (error) {
    throw new Error(handleError(error, "CarService.fetchFeaturedCars"));
  }

  return data as Car[];
};
