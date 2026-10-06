import { isProduction } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

/**
 * Terminal error handler.
 *
 * The single place where an error becomes a response. Nothing else in the
 * application is allowed to send a 5xx, which is what guarantees no stack
 * trace, Mongo error, or Resend error reaches the browser.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  // Body-parser rejects before any handler runs. Answer with wording that fits
  // the failure instead of the generic 500 text.
  if (error?.type === 'entity.too.large') {
    res.status(413).json({
      success: false,
      message: 'That message is too large to send. Please shorten it.',
    });
    return;
  }

  if (error?.type === 'entity.parse.failed') {
    res.status(400).json({
      success: false,
      message: 'The request could not be read. Please try again.',
    });
    return;
  }

  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : (error.statusCode ?? 500);

  if (!isAppError || statusCode >= 500) {
    console.error(
      `[error] ${req.method} ${req.originalUrl}`,
      isProduction ? (error?.message ?? 'Unknown error') : (error?.stack ?? error),
    );
  }

  const body = {
    success: false,
    message: isAppError
      ? error.message
      : 'Something went wrong. Please try again.',
  };

  // Field-level detail is only ever attached to a deliberate 4xx.
  if (isAppError && error.details) {
    body.errors = error.details;
  }

  res.status(statusCode).json(body);
}

/**
 * 404 handler for unmatched routes, so an unknown path returns JSON rather
 * than Express's default HTML page.
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found.',
  });
}

export default errorHandler;
