/**
 * Operational error with an HTTP status and a message that is safe to return
 * to the browser. Anything that is not an AppError is treated as unexpected
 * and reported as a generic 500.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, options = {}) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.expected = true;

    // Never leak internals into a response by accident.
    this.details = options.details ?? null;
  }
}

export const notFound = (message = 'Resource not found') => new AppError(message, 404);
export const badRequest = (message, details) => new AppError(message, 400, { details });
export const tooManyRequests = (message = 'Too many requests. Please try again later.') =>
  new AppError(message, 429);
export const serviceUnavailable = (message = 'Service temporarily unavailable. Please try again.') =>
  new AppError(message, 503);

export default AppError;
