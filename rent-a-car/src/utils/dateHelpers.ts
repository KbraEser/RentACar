export const generateDisabledDates = (
  reservations: { start_date: string; end_date: string }[]
): Date[] => {
  const disabledDates: Date[] = [];

  reservations.forEach((reservation) => {
    // Tarih string'ine saat bilgisi ekleyerek UTC sorununu çöz
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
