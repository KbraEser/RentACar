class LoggerService {
  public error(message: string, error?: Error, errorInfo?: any): void {
    console.error(`[ERROR] ${message}`, error, errorInfo);
  }

  public warn(message: string, error?: Error, errorInfo?: any): void {
    console.warn(`[WARN] ${message}`, error, errorInfo);
  }

  public info(message: string, error?: Error, errorInfo?: any): void {
    console.info(`[INFO] ${message}`, error, errorInfo);
  }

  public log(error: Error, errorInfo?: any): void {
    this.error("ErrorBoundary caught an error", error, errorInfo);
  }
}

const myLoggerService = new LoggerService();

export default myLoggerService;
