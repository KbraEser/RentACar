// Basit Error Handling
export const ERROR_MESSAGES = {
  // Auth Errors
  SIGNUP_FAILED: "Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.",
  SIGNIN_FAILED: "Giriş başarısız. Email veya şifrenizi kontrol edin.",
  INVALID_CREDENTIALS: "Geçersiz kullanıcı bilgileri.",
  USER_EXISTS: "Bu email adresi ile zaten kayıtlı bir kullanıcı bulunmaktadır.",

  // Car Errors
  CAR_FETCH_FAILED: "Araç bilgileri yüklenemedi. Lütfen sayfayı yenileyin.",
  CAR_NOT_FOUND: "Aradığınız araç bulunamadı.",
  INVALID_CAR_ID: "Geçersiz araç ID'si.",

  // Reservation Errors
  RESERVATION_CREATE_FAILED:
    "Rezervasyon oluşturulamadı. Lütfen tekrar deneyin.",
  RESERVATION_FETCH_FAILED: "Rezervasyonlar yüklenemedi.",

  // Network Errors
  NETWORK_ERROR: "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.",

  // Default
  UNKNOWN_ERROR: "Beklenmeyen bir hata oluştu.",
};
