import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../types/errors";
import myLoggerService from "../services/loggerService";

export const handleError = (error: unknown, context: string): string => {
  let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Auth errors
    if (
      message.includes("auth") ||
      message.includes("sign") ||
      message.includes("login")
    ) {
      if (message.includes("invalid") || message.includes("wrong")) {
        errorMessage = ERROR_MESSAGES.INVALID_CREDENTIALS;
      } else if (message.includes("exists") || message.includes("already")) {
        errorMessage = ERROR_MESSAGES.USER_EXISTS;
      } else {
        errorMessage = ERROR_MESSAGES.SIGNIN_FAILED;
      }
    }
    // Car errors
    else if (message.includes("car") || message.includes("vehicle")) {
      if (message.includes("not found") || message.includes("bulunamadı")) {
        errorMessage = ERROR_MESSAGES.CAR_NOT_FOUND;
      } else if (
        message.includes("invalid id") ||
        message.includes("geçersiz")
      ) {
        errorMessage = ERROR_MESSAGES.INVALID_CAR_ID;
      } else {
        errorMessage = ERROR_MESSAGES.CAR_FETCH_FAILED;
      }
    }
    // Reservation errors
    else if (
      message.includes("reservation") ||
      message.includes("rezervasyon")
    ) {
      if (message.includes("create") || message.includes("oluştur")) {
        errorMessage = ERROR_MESSAGES.RESERVATION_CREATE_FAILED;
      } else {
        errorMessage = ERROR_MESSAGES.RESERVATION_FETCH_FAILED;
      }
    }
    // Network errors
    else if (
      message.includes("network") ||
      message.includes("connection") ||
      message.includes("fetch")
    ) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    }
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  myLoggerService.error(
    `Error in ${context}: ${errorMessage}`,
    error instanceof Error ? error : undefined
  );
  return errorMessage;
};

export const handleAndShowError = (error: unknown, context: string): string => {
  const errorMessage = handleError(error, context);
  toast.error(errorMessage);
  return errorMessage;
};

export const validateInput = (
  value: unknown,
  fieldName: string,
  required: boolean = true
): void => {
  if (required && (value === undefined || value === null || value === "")) {
    throw new Error(`${fieldName} alanı zorunludur`);
  }
};

export const validateCarId = (id: string): void => {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new Error("Geçersiz araç ID formatı");
  }
};

export const validateDateRange = (startDate: string, endDate: string): void => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    throw new Error("Başlangıç tarihi bugünden önce olamaz");
  }

  if (end <= start) {
    throw new Error("Bitiş tarihi başlangıç tarihinden sonra olmalıdır");
  }
};
