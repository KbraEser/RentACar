class LoggerService {
  public error(message: string, error?: Error, errorInfo?: any): void {
    console.error(`[ERROR] ${message}`, error, errorInfo);

    // Production'da external logging service'e gönderilebilir
    if (process.env.NODE_ENV === "production") {
      // TODO: External logging service integration
      // Örnek: Sentry, LogRocket, vs.
    }
  }

  public log(error: Error, errorInfo?: any): void {
    this.error("ErrorBoundary caught an error", error, errorInfo);
  }

  public info(message: string, data?: any): void {
    console.info(`[INFO] ${message}`, data);
  }

  public warn(message: string, data?: any): void {
    console.warn(`[WARN] ${message}`, data);
  }
}

const myLoggerService = new LoggerService();

export default myLoggerService;
