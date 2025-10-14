import { supabase } from "../lib/supabaseClient";
import type { Car } from "../types/car";
import { handleError, validateCarId } from "../utils/errorHandler";

// Car filter types
export interface CarFilters {
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  make?: string;
  fuel_type?: string;
  transmission?: string;
  seats?: number;
  is_available?: boolean;
  is_featured?: boolean;
}

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
  filters: CarFilters
): Promise<Car[]> => {
  let query = supabase.from("cars").select("*");

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      if (key === "startDate" || key === "endDate") {
        return;
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

  const { data: cars, error } = await query;

  if (error) {
    throw new Error(handleError(error, "CarService.fetchFilteredCars"));
  }

  if (filters.startDate && filters.endDate) {
    const availableCars = await filterCarsByReservations(
      cars,
      filters.startDate,
      filters.endDate
    );
    return availableCars;
  }

  return cars as Car[];
};

const filterCarsByReservations = async (
  cars: Car[],
  startDate: string,
  endDate: string
): Promise<Car[]> => {
  if (cars.length === 0) return [];
  const carIds = cars.map((car) => car.id);

  const { data: reservations } = await supabase
    .from("rentals")
    .select("car_id,start_date,end_date")
    .in("car_id", carIds)
    .eq("status", "active");

  const reservationByCar =
    reservations?.reduce((acc, reservation) => {
      if (!acc[reservation.car_id]) {
        acc[reservation.car_id] = [];
      }
      acc[reservation.car_id].push(reservation);
      return acc;
    }, {} as Record<string, typeof reservations>) || {};

  const availableCars = cars.filter((car) => {
    const carReservations = reservationByCar[car.id] || [];

    return !carReservations.some((reservation) => {
      const resStart = new Date(reservation.start_date);
      const resEnd = new Date(reservation.end_date);
      const filterStart = new Date(startDate);
      const filterEnd = new Date(endDate);

      return resStart <= filterEnd && resEnd >= filterStart;
    });
  });
  return availableCars;
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
