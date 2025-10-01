import { useLoaderData } from "react-router-dom";
import { getCarImage } from "../utils/carImages";
import type { Car } from "../../types/car";
import { DELIVERY_LOCATIONS } from "../../constants";

const ReservationForm = () => {
  const car = useLoaderData() as Car;

  return (
    <div className="space-y-6 m-10">
      {/* Araç Bilgileri */}
      <div
        className="rounded-lg shadow-lg p-6"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-gray-800)" }}
        >
          Rezervasyon Formu
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={getCarImage(car.make)}
              alt={`${car.make} ${car.model}`}
              className="w-full max-w-lg rounded-lg shadow-xl"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {car.make} {car.model}
              </h2>
              <p className="text-gray-600 text-lg">{car.year} Model</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Yakıt Türü:</span>
                <span className="text-gray-800">{car.fuel_type}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Vites:</span>
                <span className="text-gray-800">{car.transmission}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Kapasite:</span>
                <span className="text-gray-800">{car.seats} Kişi</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Açıklama:</span>
                <span className="text-gray-800">{car.description}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Günlük Fiyat</p>
                <p className="text-4xl font-bold text-blue-600">
                  {car.price_per_day}₺
                </p>
                <p className="text-gray-500 text-sm">/gün</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Rezervasyon Bilgileri
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Başlangıç Tarihi
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teslim Yeri
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Teslim yerini seçin</option>
                    {DELIVERY_LOCATIONS.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  Rezervasyonu Tamamla
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
