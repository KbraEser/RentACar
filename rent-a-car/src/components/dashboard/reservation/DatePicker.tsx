import ReactDatePicker from "react-datepicker";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { ReservationFormData } from "./ReservationForm";
import { registerLocale } from "react-datepicker";
import { tr } from "date-fns/locale/tr";
interface DatePickerProps {
  register: UseFormRegister<ReservationFormData>;
  watch: UseFormWatch<ReservationFormData>;
  setValue: UseFormSetValue<ReservationFormData>;
}

registerLocale("tr", tr);

const DatePicker = ({ register, watch, setValue }: DatePickerProps) => {
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="reservation-form-grid">
      <div className="reservation-form-group">
        <label className="reservation-form-label">Başlangıç Tarihi</label>
        <ReactDatePicker
          {...register("startDate")}
          selected={startDate ? new Date(startDate) : null}
          onChange={(date) => setValue("startDate", date?.toISOString() || "")}
          dateFormat="dd/MM/yyyy"
          minDate={startDate ? new Date(startDate) : new Date()}
          excludeDates={}
          placeholderText="Başlangıç Tarihi"
          disabled={}
          className="reservation-datepicker"
          locale="tr"
        />
      </div>
      <div className="reservation-form-group">
        <label className="reservation-form-label">Bitiş Tarihi</label>
        <ReactDatePicker
          {...register("endDate")}
          selected={endDate ? new Date(endDate) : null}
          onChange={(date) => setValue("endDate", date?.toISOString() || "")}
          dateFormat="dd/MM/yyyy"
          minDate={endDate ? new Date(endDate) : new Date()}
          excludeDates={}
          placeholderText="Bitiş Tarihi"
          disabled={}
          className="reservation-datepicker"
          locale="tr"
        />
      </div>
    </div>
  );
};

export default DatePicker;
