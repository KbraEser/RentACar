import type { Car } from "../../types/car";
import CarItem from "./CarItem";
import LoadingCard from "../common/LoadingCard";

interface CarGridProps {
  cars: Car[];
  loading?: boolean;
}

export default function CarGrid({ cars, loading = false }: CarGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} title="Araç yükleniyor..." />
        ))}
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Araç bulunamadı
        </h3>
        <p className="text-gray-500">
          Arama kriterlerinize uygun araç bulunamadı. Filtreleri değiştirmeyi
          deneyin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {cars.map((car: Car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}
