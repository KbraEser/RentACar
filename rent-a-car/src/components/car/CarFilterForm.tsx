import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  CITIES,
  CAR_MAKES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  PRICE_RANGES,
} from "../../constants";

export interface FilterFormData {
  startDate: string;
  endDate: string;
  city: string;
  make: string;
  fuel_type: string;
  minPrice: string;
  transmission: string;
}

interface CarFilterFormProps {
  onFiltersChange: (filters: FilterFormData) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export default function CarFilterForm({
  onFiltersChange,
  onClearFilters,
  loading = false,
}: CarFilterFormProps) {
  const { register, reset, getValues } = useForm<FilterFormData>();
  const [startDate, setStartDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);

    const currentValues = getValues();
    if (
      currentValues.endDate &&
      e.target.value &&
      currentValues.endDate < e.target.value
    ) {
      currentValues.endDate = "";
      reset({
        ...currentValues,
        endDate: "",
      });
    }

    // Form değerini güncelle ve filtreleri uygula
    const updatedValues = {
      ...currentValues,
      startDate: e.target.value,
    };
    onFiltersChange(updatedValues);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValues = getValues();
    const selectedEndDate = e.target.value;

    if (startDate && selectedEndDate && selectedEndDate < startDate) {
      alert("Bitiş tarihi başlangıç tarihinden önce olamaz!");
      e.target.value = "";
      return;
    }

    const updatedValues = {
      ...currentValues,
      endDate: selectedEndDate,
    };
    onFiltersChange(updatedValues);
  };

  const handleFilterChange = () => {
    const currentValues = getValues();
    onFiltersChange(currentValues);
  };

  const handleClearFilters = () => {
    reset();
    setStartDate("");
    onClearFilters();
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <input
          {...register("startDate")}
          type="date"
          placeholder="Başlangıç Tarihi"
          className="search-input"
          min={new Date().toISOString().split("T")[0]}
          onChange={handleStartDateChange}
        />

        <input
          {...register("endDate")}
          type="date"
          placeholder="Bitiş Tarihi"
          className="search-input"
          min={startDate || new Date().toISOString().split("T")[0]}
          onChange={handleEndDateChange}
        />

        <select
          {...register("city")}
          className="search-input"
          onChange={handleFilterChange}
        >
          <option value="">Lokasyon Seçin</option>
          {CITIES.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>

        <select
          {...register("make")}
          className="search-input"
          onChange={handleFilterChange}
        >
          <option value="">Araç Markası</option>
          {CAR_MAKES.map((make) => (
            <option key={make.value} value={make.value}>
              {make.label}
            </option>
          ))}
        </select>

        <select
          {...register("fuel_type")}
          className="search-input"
          onChange={handleFilterChange}
        >
          <option value="">Yakıt Tipi</option>
          {FUEL_TYPES.map((fuel) => (
            <option key={fuel.value} value={fuel.value}>
              {fuel.label}
            </option>
          ))}
        </select>

        <select
          {...register("transmission")}
          className="search-input"
          onChange={handleFilterChange}
        >
          <option value="">Vites Tipi</option>
          {TRANSMISSION_TYPES.map((transmission) => (
            <option key={transmission.value} value={transmission.value}>
              {transmission.label}
            </option>
          ))}
        </select>

        <select
          {...register("minPrice")}
          className="search-input"
          onChange={handleFilterChange}
        >
          <option value="">Fiyat Aralığı</option>
          {PRICE_RANGES.map((price) => (
            <option key={price.value} value={price.value}>
              {price.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleClearFilters}
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Yükleniyor..." : "Temizle"}
        </button>
      </div>
    </form>
  );
}
