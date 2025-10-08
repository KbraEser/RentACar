import { useLoaderData, useNavigate } from "react-router-dom";
import { getCarImage } from "../../utils/carImages";
import type { Car } from "../../../types/car";
import { DELIVERY_LOCATIONS, TIME_CONSTANTS } from "../../../constants";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { getMinDate, getTodayString } from "../../utils/dataUtils";
import { validateAndResetEndDate } from "../../utils/dataUtils";
import { createReservation } from "../../../store/slices/rentalsSlice";
import { useAppDispatch } from "../../../app/hooks/storeHooks";
import { handleAndShowError } from "../../../utils/errorHandler";

export interface ReservationFormData {
  startDate: string;
  endDate: string;
  totalPrice: number;
}

const ReservationForm = () => {
  const carData = useLoaderData();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const savedFilters = JSON.parse(localStorage.getItem("filters") || "{}");
  const { startDate: savedStartDate, endDate: savedEndDate } = savedFilters;

  const { register, watch, setValue } = useForm<ReservationFormData>({
    defaultValues: {
      startDate: savedStartDate || "",
      endDate: savedEndDate || "",
      totalPrice: 0,
    },
  });

  const car = carData as Car;
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const totalPrice = watch("totalPrice");

  useEffect(() => {
    if (!car) return; // Early return inside useEffect is OK

    validateAndResetEndDate(startDate, endDate, setValue);
    if (endDate && startDate && endDate >= startDate) {
      const totalPrice =
        car.price_per_day *
        ((new Date(endDate).getTime() - new Date(startDate).getTime()) /
          TIME_CONSTANTS.MILLISECONDS_IN_DAY);
      setValue("totalPrice", totalPrice);
    }
  }, [startDate, endDate, car?.price_per_day, setValue, car]);

  // Car veya city null ise early return
  if (!car) {
    return <div>Araç bilgisi yüklenemedi</div>;
  }

  return (
    <div className="reservation-container">
      <div className="reservation-card">
        <h1 className="reservation-title">Rezervasyon Formu</h1>

        <div className="reservation-grid">
          <div className="reservation-image-container">
            <img
              src={getCarImage(car.make)}
              alt={`${car.make} ${car.model}`}
              className="reservation-image"
            />
          </div>

          <div className="reservation-content">
            <div>
              <h2 className="reservation-car-title">
                {car.make} {car.model}
              </h2>
              <p className="reservation-car-year">{car.year} Model</p>
            </div>

            <div className="reservation-details">
              <div className="reservation-detail-row">
                <span className="reservation-detail-label">Yakıt Türü:</span>
                <span className="reservation-detail-value">
                  {car.fuel_type}
                </span>
              </div>
              <div className="reservation-detail-row">
                <span className="reservation-detail-label">Vites:</span>
                <span className="reservation-detail-value">
                  {car.transmission}
                </span>
              </div>
              <div className="reservation-detail-row">
                <span className="reservation-detail-label">Şehir:</span>
                <span className="reservation-detail-value">{car.city}</span>
              </div>
              <div className="reservation-detail-row">
                <span className="reservation-detail-label">Kapasite:</span>
                <span className="reservation-detail-value">
                  {car.seats} Kişi
                </span>
              </div>
              <div className="reservation-detail-row">
                <span className="reservation-detail-label">Açıklama:</span>
                <span className="reservation-detail-value">
                  {car.description}
                </span>
              </div>
            </div>

            <div className="reservation-price-container">
              <div className="text-center">
                <p className="reservation-price-label">Toplam Fiyat</p>
                <p className="reservation-price-value">{totalPrice}₺</p>
                <p className="reservation-price-per-day">
                  {car.price_per_day}₺/gün
                </p>
              </div>
            </div>

            <div className="reservation-form-section">
              <h3 className="reservation-form-title">Rezervasyon Bilgileri</h3>

              <form className="space-y-4">
                <div className="reservation-form-grid">
                  <div className="reservation-form-group">
                    <label className="reservation-form-label">
                      Başlangıç Tarihi
                    </label>
                    <input
                      {...register("startDate")}
                      defaultValue={savedStartDate || ""}
                      type="date"
                      className="reservation-form-input"
                      required
                      min={getTodayString()}
                    />
                  </div>
                  <div className="reservation-form-group">
                    <label className="reservation-form-label">
                      Bitiş Tarihi
                    </label>
                    <input
                      {...register("endDate")}
                      defaultValue={savedEndDate || ""}
                      type="date"
                      className="reservation-form-input"
                      required
                      min={getMinDate(watch("startDate"))}
                    />
                  </div>
                </div>

                <div>
                  <label className="reservation-form-label">Teslim Yeri</label>
                  <select className="reservation-form-select">
                    <option value="">Lokasyon seçin</option>
                    {DELIVERY_LOCATIONS.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  disabled={!startDate || !endDate || !totalPrice}
                  onClick={() => {
                    dispatch(
                      createReservation({
                        reservation: {
                          user_id: user?.id || "",
                          car_id: car.id,
                          start_date: startDate,
                          end_date: endDate,
                          total_price: totalPrice,
                          status: "active",
                          city: car.city,
                        },
                        car: car,
                      })
                    )
                      .then(() => {
                        navigate("/dashboard");
                      })
                      .catch((error) => {
                        handleAndShowError(error, "ReservationForm.onClick");
                      });
                  }}
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
