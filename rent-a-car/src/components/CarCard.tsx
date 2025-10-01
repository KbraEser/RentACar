import { useLoaderData, useNavigate } from "react-router-dom";
import type { Car } from "../types/car";
import { getCarImage } from "./utils/carImages";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { fetchFilteredCars } from "../services/carService";
import {
  CITIES,
  CAR_MAKES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  PRICE_RANGES,
} from "../constants";
import LoadingCard from "./common/LoadingCard";

interface FilterFormData {
  startDate: string;
  endDate: string;
  city: string;
  make: string;
  fuel_type: string;
  minPrice: string;
  transmission: string;
}

function CarCard() {
  const initialCars = useLoaderData() as Car[];
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>("");

  const { register, watch, reset, getValues } = useForm<FilterFormData>();
  const navigate = useNavigate();

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

        if (Object.keys(filters).length > 0) {
          const filteredCars = await fetchFilteredCars(filters);
          setCars(filteredCars);
        } else {
          setCars(initialCars);
        }
      } catch (error) {
        setCars(initialCars);
      } finally {
        setLoading(false);
      }
    },
    [initialCars]
  );

  useEffect(() => {
    const subscription = watch(() => {
      const currentValues = getValues();
      applyFilters(currentValues);
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, applyFilters]);

  const clearFilters = () => {
    reset();
    setStartDate("");
    setCars(initialCars);
  };

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
  };

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

      {/* Filtreleme Formu */}
      <form className="bg-white p-6 rounded-lg shadow-lg mb-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <input
            {...register("startDate")}
            type="date"
            placeholder="Başlangıç Tarihi"
            className="search-input"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              handleStartDateChange(e);
              // Form değerini de güncelle
              const currentValues = getValues();
              currentValues.startDate = e.target.value;
              applyFilters(currentValues);
            }}
          />

          <input
            {...register("endDate")}
            type="date"
            placeholder="Bitiş Tarihi"
            className="search-input"
            min={startDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const currentValues = getValues();
              const selectedEndDate = e.target.value;

              if (startDate && selectedEndDate && selectedEndDate < startDate) {
                alert("Bitiş tarihi başlangıç tarihinden önce olamaz!");
                e.target.value = "";
                return;
              }

              currentValues.endDate = selectedEndDate;
              applyFilters(currentValues);
            }}
          />

          <select {...register("city")} className="search-input">
            <option value="">Lokasyon Seçin</option>
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>

          <select {...register("make")} className="search-input">
            <option value="">Araç Markası</option>
            {CAR_MAKES.map((make) => (
              <option key={make.value} value={make.value}>
                {make.label}
              </option>
            ))}
          </select>

          <select {...register("fuel_type")} className="search-input">
            <option value="">Yakıt Tipi</option>
            {FUEL_TYPES.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.label}
              </option>
            ))}
          </select>

          <select {...register("transmission")} className="search-input">
            <option value="">Vites Tipi</option>
            {TRANSMISSION_TYPES.map((transmission) => (
              <option key={transmission.value} value={transmission.value}>
                {transmission.label}
              </option>
            ))}
          </select>

          <select {...register("minPrice")} className="search-input">
            <option value="">Fiyat Aralığı</option>
            {PRICE_RANGES.map((price) => (
              <option key={price.value} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Yükleniyor..." : "Temizle"}
          </button>
        </div>
      </form>

      <div className="flex justify-between items-center mb-6 font-bold">
        <div>
          <p>{cars.length} araç bulundu</p>
          {startDate && (
            <p className="text-sm text-gray-600">
              Seçilen tarih aralığı: {startDate}
              {getValues().endDate && ` - ${getValues().endDate}`}
            </p>
          )}
        </div>
        {loading && <p>Filtreleme yapılıyor...</p>}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car: Car) => (
          <div
            key={car.id}
            onClick={() => navigate(`/cars/carsDetail/${car.id}`)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={getCarImage(car.make)}
              alt={`${car.make} ${car.model}`}
              className="w-2/3 h-34 md:w-full md:h-48 object-cover pl-6"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {car.make} {car.model}
              </h3>
              <p className="text-gray-600">{car.year}</p>
              <p className="text-xl font-bold text-blue-600">
                {car.price_per_day}₺/gün
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {car.fuel_type} • {car.seats} kişi • {car.transmission}
              </p>
              <button className="primary-button">Detaylı Bilgi</button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/dashboard/reservationForm/${car.id}`);
                }}
                className="secondary-button"
              >
                Rezervasyon Yap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarCard;
