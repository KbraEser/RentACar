export const getTodayString = () => new Date().toISOString().split("T")[0];

export const getMinDate = (startDate: string) => startDate || getTodayString();

export const validateAndResetEndDate = (
  startDate: string,
  endDate: string,
  setValue: (field: "endDate", value: string) => void
) => {
  if (startDate && endDate && startDate > endDate) {
    setValue("endDate", "");
  }
};
