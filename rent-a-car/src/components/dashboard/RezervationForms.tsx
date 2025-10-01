import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../app/hooks/storeHooks";
import type { RootState } from "../../store/store";
import type { Car } from "../../types/car";
import { createReservation } from "../../store/slices/rentalsSlice";
import { getCarImage } from "../utils/carImages";

interface ReservationFormData {
  startDate: string;
  endDate: string;
  totalPrice: number;
}

const RezervationForm = () => {
  const car = useLoaderData() as Car;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Fiyat hesaplama
  const calculatePrice = () => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalPrice = diffDays * car.price_per_day;
      setCalculatedPrice(totalPrice);
      return totalPrice;
    }
    return 0;
  };

  // Tarih değiştiğinde fiyatı hesapla
  useEffect(() => {
    if (startDate && endDate) {
      calculatePrice();
    }
  }, [startDate, endDate]);

  const onSubmit = async () => {
    if (!user) {
      alert("Rezervasyon yapmak için giriş yapmalısınız!");
      return;
    }

    if (!startDate || !endDate) {
      alert("Lütfen başlangıç ve bitiş tarihlerini seçin!");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("Bitiş tarihi başlangıç tarihinden sonra olmalıdır!");
      return;
    }

    setLoading(true);
    try {
      const totalPrice = calculatePrice();

      await dispatch(
        createReservation({
          user_id: user.id,
          car_id: car.id.toString(),
          start_date: startDate,
          end_date: endDate,
          total_price: totalPrice,
          status: "active",
        })
      ).unwrap();

      alert("Rezervasyonunuz başarıyla oluşturuldu!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Rezervasyon oluşturma hatası:", error);
      alert("Rezervasyon oluşturulurken bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 m-10">
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

        {/* Araç Bilgileri */}
        <div
          className="mb-8 p-4 border rounded-lg"
          style={{ borderColor: "var(--color-gray-300)" }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={getCarImage(car.make)}
              alt={`${car.make} ${car.model}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--color-gray-800)" }}
              >
                {car.make} {car.model}
              </h3>
              <p className="text-gray-600">{car.year}</p>
              <p
                className="text-lg font-bold"
                style={{ color: "var(--color-orange-600)" }}
              >
                {car.price_per_day}₺/gün
              </p>
              <p className="text-sm text-gray-500">
                {car.fuel_type} • {car.seats} kişi • {car.transmission}
              </p>
            </div>
          </div>
        </div>

        {/* Rezervasyon Formu */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-gray-700)" }}
              >
                Başlangıç Tarihi
              </label>
              <input
                {...register("startDate", {
                  required: "Başlangıç tarihi gereklidir",
                })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                style={{ borderColor: "var(--color-gray-300)" }}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-gray-700)" }}
              >
                Bitiş Tarihi
              </label>
              <input
                {...register("endDate", {
                  required: "Bitiş tarihi gereklidir",
                })}
                type="date"
                min={startDate || new Date().toISOString().split("T")[0]}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                style={{ borderColor: "var(--color-gray-300)" }}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Fiyat Hesaplama */}
          {startDate && endDate && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4
                className="font-semibold mb-2"
                style={{ color: "var(--color-gray-800)" }}
              >
                Fiyat Hesaplama
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Günlük Fiyat:</span>
                  <span>{car.price_per_day}₺</span>
                </div>
                <div className="flex justify-between">
                  <span>Toplam Gün:</span>
                  <span>
                    {Math.ceil(
                      (new Date(endDate).getTime() -
                        new Date(startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    gün
                  </span>
                </div>
                <div
                  className="flex justify-between font-bold text-lg border-t pt-2"
                  style={{ borderColor: "var(--color-gray-300)" }}
                >
                  <span>Toplam Tutar:</span>
                  <span style={{ color: "var(--color-orange-600)" }}>
                    {calculatedPrice}₺
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Butonlar */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading || !startDate || !endDate}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Rezervasyon Yapılıyor..." : "Rezervasyon Yap"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/cars")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RezervationForm;
