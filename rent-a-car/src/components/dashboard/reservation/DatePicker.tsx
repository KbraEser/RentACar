import ReactDatePicker from "react-datepicker";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { ReservationFormData } from "./ReservationForm";
import { registerLocale } from "react-datepicker";
import { tr } from "date-fns/locale/tr";
import { generateDisabledDates } from "../../../utils/dateHelpers";
import type { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/storeHooks";
import { useEffect } from "react";
import { fetchRentalsByStatusDate } from "../../../store/slices/rentalsSlice";
import { isSelectedDateInDisabledDates } from "../../../utils/dateHelpers";
interface DatePickerProps {
  register: UseFormRegister<ReservationFormData>;
  watch: UseFormWatch<ReservationFormData>;
  setValue: UseFormSetValue<ReservationFormData>;
  carId: string;
}

registerLocale("tr", tr);

const DatePicker = ({ register, watch, setValue, carId }: DatePickerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (carId) {
      dispatch(fetchRentalsByStatusDate(carId));
    }
  }, [dispatch, carId]);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const reservations = useAppSelector((state: RootState) =>
    state.rentals.carReservations.map((rental) => ({
      start_date: rental.start_date,
      end_date: rental.end_date,
    }))
  );

  const disabledDates = generateDisabledDates(reservations);
  useEffect(() => {
    if (startDate && endDate) {
      isSelectedDateInDisabledDates(startDate, endDate, reservations, setValue);
    }
  }, [startDate, endDate, reservations, setValue]);

  return (
    <div className="reservation-form-grid">
      <div className="reservation-form-group">
        <label className="reservation-form-label">Başlangıç Tarihi</label>
        <ReactDatePicker
          {...register("startDate")}
          selected={startDate ? new Date(startDate + "T00:00:00") : null}
          onChange={(date) => {
            if (date) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              setValue("startDate", `${year}-${month}-${day}`);
            } else {
              setValue("startDate", "");
            }
          }}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          excludeDates={disabledDates}
          placeholderText="Başlangıç Tarihi"
          disabled={Boolean(
            disabledDates.includes(new Date(startDate + "T00:00:00"))
          )}
          className="reservation-datepicker"
          locale="tr"
        />
      </div>
      <div className="reservation-form-group">
        <label className="reservation-form-label">Bitiş Tarihi</label>
        <ReactDatePicker
          {...register("endDate")}
          selected={endDate ? new Date(endDate + "T00:00:00") : null}
          onChange={(date) => {
            if (date) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              setValue("endDate", `${year}-${month}-${day}`);
            } else {
              setValue("endDate", "");
            }
          }}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          excludeDates={disabledDates}
          placeholderText="Bitiş Tarihi"
          disabled={Boolean(
            disabledDates.includes(new Date(endDate + "T00:00:00"))
          )}
          className="reservation-datepicker"
          locale="tr"
        />
      </div>
    </div>
  );
};

export default DatePicker;
