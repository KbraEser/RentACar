export const generateDisabledDates = (
  reservations: { start_date: string; end_date: string }[]
): Date[] => {
  const disabledDates: Date[] = [];

  reservations.forEach((reservation) => {
    const start = new Date(reservation.start_date);
    const end = new Date(reservation.end_date);

    let currentDate = new Date(start);
    while (currentDate <= end) {
      disabledDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  return disabledDates;
};
