import { createLogger, format, Logger, transports } from 'winston'

export class Log {
  private static instance: Log
  private readonly logger: Logger

  private constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
      ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
      ],
    })
  }

  private static getInstance(): Log {
    if (!Log.instance) {
      Log.instance = new Log()
    }
    return Log.instance
  }

  public static error(message: string): void {
    Log.getInstance().logger.error(message)
  }
}
