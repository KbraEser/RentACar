import { useState, useCallback } from "react";
import type { Car } from "../types/car";
import { fetchFilteredCars } from "../services/carService";
import type { FilterFormData } from "../components/car/CarFilterForm";
import { handleAndShowError } from "../utils/errorHandler";

interface UseCarFilterProps {
  initialCars: Car[];
}

export function useCarFilter({ initialCars }: UseCarFilterProps) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });

  const applyFilters = useCallback(
    async (formData: FilterFormData) => {
      setLoading(true);
      try {
        // Filtreleri hazırla
        const filters: Record<string, any> = {};

        // Şehir filtresi
        if (formData.city && formData.city !== "") {
          filters.city = formData.city;
        }

        // Marka filtresi
        if (formData.make && formData.make !== "") {
          filters.make = formData.make;
        }

        // Yakıt türü filtresi
        if (formData.fuel_type && formData.fuel_type !== "") {
          filters.fuel_type = formData.fuel_type;
        }

        // Vites türü filtresi
        if (formData.transmission && formData.transmission !== "") {
          filters.transmission = formData.transmission;
        }

        // Fiyat filtresi (string'i number'a çevir)
        if (formData.minPrice && formData.minPrice !== "") {
          filters.min_price = parseInt(formData.minPrice);
        }

        // Tarih aralığını güncelle
        setSelectedDateRange({
          startDate: formData.startDate || "",
          endDate: formData.endDate || "",
        });

        if (Object.keys(filters).length > 0) {
          const filteredCars = await fetchFilteredCars(filters);
          setCars(filteredCars);
        } else {
          setCars(initialCars);
        }
      } catch (error) {
        handleAndShowError(error, "useCarFilter.applyFilters");
        setCars(initialCars);
      } finally {
        setLoading(false);
      }
    },
    [initialCars]
  );

  const clearFilters = useCallback(() => {
    setCars(initialCars);
    setSelectedDateRange({ startDate: "", endDate: "" });
  }, [initialCars]);

  return {
    cars,
    loading,
    selectedDateRange,
    applyFilters,
    clearFilters,
  };
}
