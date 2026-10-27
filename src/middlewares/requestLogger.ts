import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const durationMs = Number(endTime - startTime) / 1_000_000;
    const formattedDuration = `${durationMs.toFixed(2)}ms`;

    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;

    let statusFormatted = `${status}`;
    if (status >= 500) {
      statusFormatted = `\x1b[31m${status}\x1b[0m`; // Red
    } else if (status >= 400) {
      statusFormatted = `\x1b[33m${status}\x1b[0m`; // Yellow
    } else if (status >= 300) {
      statusFormatted = `\x1b[36m${status}\x1b[0m`; // Cyan
    } else if (status >= 200) {
      statusFormatted = `\x1b[32m${status}\x1b[0m`; // Green
    }

    console.log(
      `[HTTP] ${method} ${url} ${statusFormatted} - ${formattedDuration}`
    );
  });

  next();
};
