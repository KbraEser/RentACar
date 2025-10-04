import { useLoaderData } from "react-router-dom";
import type { Car } from "../types/car";
import LoadingCard from "./common/LoadingCard";
import CarFilterForm from "./car/CarFilterForm";
import CarFilterResults from "./car/CarFilterResults";
import CarGrid from "./car/CarGrid";
import { useCarFilter } from "../app/hooks/useCarFilter";

function CarCard() {
  const initialCars = useLoaderData() as Car[];
  const { cars, loading, selectedDateRange, applyFilters, clearFilters } =
    useCarFilter({ initialCars });

  // Initial loading state - sadece araçlar yoksa göster
  if (!initialCars || initialCars.length === 0) {
    return (
      <div className="mx-6">
        <LoadingCard title="Araçlar yükleniyor..." />
      </div>
    );
  }

  return (
    <div className="py-10 mx-6">
      <h2 className="text-xl font-bold mb-6">Araç Filtreleme</h2>

      <CarFilterForm
        onFiltersChange={applyFilters}
        onClearFilters={clearFilters}
        loading={loading}
      />

      <CarFilterResults
        carCount={cars.length}
        loading={loading}
        selectedDateRange={selectedDateRange}
      />

      <CarGrid cars={cars} loading={loading} />
    </div>
  );
}

export default CarCard;
