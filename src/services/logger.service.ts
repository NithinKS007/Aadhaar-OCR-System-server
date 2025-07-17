import { Logger, transports, createLogger, format } from "winston";
import morgan from "morgan";
import { ILoggerService } from "@interfaces/services/IServices";
import { injectable } from "inversify";
import { Handler } from "express";
const { combine, timestamp, errors, colorize, printf, json } = format;

const development = process.env.NODE_ENV === "DEVELOPMENT";

const devFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `${timestamp} [${level}]: ${message}\n${stack}`
      : `${timestamp} [${level}]: ${message}`;
  })
);

const nonDevFormat = combine(timestamp(), errors({ stack: true }), json());

@injectable()
class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: development ? "debug" : "info",
      format: development ? devFormat : nonDevFormat,
      defaultMeta: { service: "Aadhaar-OCR-System-Server" },
      transports: [
        new transports.Console(),
      ],
    });
  }

  public log(message: string): void {
    this.logger.info(message);
  }

  public error(message: string, error?: Error): void {
    if (error) {
      this.logger.error(message, error);
    } else {
      this.logger.error(message);
    }
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public verbose(message: string): void {
    this.logger.verbose(message);
  }

  public streamLog(): Handler {
    return morgan(
      ":method :url :status :res[content-length] - :response-time ms",
      {
        stream: {
          write: (message: string) => {
            this.logger.info(message.trim());
          },
        },
      }
    );
  }
}

export { LoggerService };
