import { Response, Request, NextFunction } from "express";
import pino from "pino";

type LoggerCallback = (req: Request, res: Response, log: pino.Logger) => void;

export const appLogger = (LoggingFunction: LoggerCallback) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.log.info({ method: req.method, url: req.url });

    const logger = pino({
      transport: {
        target: "pino/file",
        options: { destination: "./logs/app.log" },
      },
    });
    logger.info({
      statusCode: res.statusCode,
      method: req.method,
      url: req.url,
    });
    next();
  };
};
