import { toast } from "react-toastify";
import { useAppSelector } from "../app/hooks/storeHooks";
import type { RootState } from "../store/store";

export const generateDisabledDates = (
  reservations: { start_date: string; end_date: string }[]
): Date[] => {
  const disabledDates: Date[] = [];

  reservations.forEach((reservation) => {
    const start = new Date(reservation.start_date + "T00:00:00");
    const end = new Date(reservation.end_date + "T00:00:00");

    let currentDate = new Date(start);
    while (currentDate <= end) {
      disabledDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  return disabledDates;
};

export const isSelectedDateInDisabledDates = (
  startDate: string,
  endDate: string,
  reservations: { start_date: string; end_date: string }[],
  setValue?: (field: "startDate" | "endDate", value: string) => void
) => {
  if (!startDate || !endDate) return false;

  const disabledDates = generateDisabledDates(reservations);
  const hasConflict = disabledDates.some(
    (date) => new Date(startDate) <= date && new Date(endDate) >= date
  );

  if (hasConflict) {
    if (setValue) {
      setValue("startDate", "");
      setValue("endDate", "");
    }
    toast.error(
      "Bu tarih aralığında rezervasyon yapılamaz lütfen başka bir tarih seçiniz"
    );
    return true;
  }
  return false;
};

export const localizeDate = (date: Date) => {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return "";
};
