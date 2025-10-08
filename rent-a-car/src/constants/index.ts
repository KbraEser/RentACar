// Şehir listesi
export const CITIES = [
  { value: "İstanbul", label: "İstanbul" },
  { value: "Ankara", label: "Ankara" },
  { value: "İzmir", label: "İzmir" },
  { value: "Bursa", label: "Bursa" },
  { value: "Adana", label: "Adana" },
  { value: "Antalya", label: "Antalya" },
  { value: "Gaziantep", label: "Gaziantep" },
  { value: "Konya", label: "Konya" },
] as const;

// Araç markaları
export const CAR_MAKES = [
  { value: "bmw", label: "BMW" },
  { value: "chery", label: "Chery" },
  { value: "citroen", label: "Citroen" },
  { value: "ford", label: "Ford" },
  { value: "honda", label: "Honda" },
  { value: "jeep", label: "Jeep" },
  { value: "mercedes", label: "Mercedes" },
  { value: "nissan", label: "Nissan" },
  { value: "ssangyong", label: "SSangyong" },
  { value: "subaru", label: "Subaru" },
  { value: "tesla", label: "Tesla" },
  { value: "toyota", label: "Toyota" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "volvo", label: "Volvo" },
] as const;

// Yakıt türleri
export const FUEL_TYPES = [
  { value: "benzin", label: "Benzin" },
  { value: "dizel", label: "Dizel" },
  { value: "elektrik", label: "Elektrik" },
  { value: "hybrid", label: "Hybrid" },
] as const;

// Vites türleri
export const TRANSMISSION_TYPES = [
  { value: "otomatik", label: "Otomatik" },
  { value: "manuel", label: "Manuel" },
] as const;

// Fiyat aralıkları
export const PRICE_RANGES = [
  { value: "0-50", label: "0-50₺", min: 0, max: 50 },
  { value: "50-100", label: "50-100₺" },
  { value: "100-150", label: "100-150₺", min: 100, max: 150 },
  { value: "150-200", label: "150-200₺", min: 150, max: 200 },
  { value: "200-999", label: "200₺+", min: 200, max: 999 },
] as const;

// Teslim yerleri
export const DELIVERY_LOCATIONS = [
  { value: "office", label: "Ofis" },
  { value: "airport", label: "Havaalanı" },
  { value: "hotel", label: "Otel" },
  { value: "home", label: "Ev Adresi" },
] as const;

// Time constants
export const TIME_CONSTANTS = {
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24, // 86,400,000
} as const;

// Type definitions
export type CityValue = (typeof CITIES)[number]["value"];
export type CarMakeValue = (typeof CAR_MAKES)[number]["value"];
export type FuelTypeValue = (typeof FUEL_TYPES)[number]["value"];
export type TransmissionTypeValue =
  (typeof TRANSMISSION_TYPES)[number]["value"];
export type PriceRangeValue = (typeof PRICE_RANGES)[number]["value"];
export type DeliveryLocationValue =
  (typeof DELIVERY_LOCATIONS)[number]["value"];
