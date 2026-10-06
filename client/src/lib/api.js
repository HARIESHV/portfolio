/**
 * Backend API client.
 *
 * `VITE_API_URL` is the only frontend environment variable and it points at the
 * public base URL of the Express service (ending in `/api`). MONGODB_URI and
 * RESEND_API_KEY live exclusively in the server environment and are never
 * referenced here.
 */

const RAW_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

const REQUEST_TIMEOUT_MS = 15000;

/**
 * Error shape returned to the UI. Deliberately carries only a safe, user-facing
 * message: the server never forwards stack traces, database errors, or
 * provider errors to the client, and neither do we.
 */
export class ApiError extends Error {
  constructor(message, { status = 0, fieldErrors = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request(path, { method = 'GET', body, signal } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    let payload = null;
    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      payload = await response.json().catch(() => null);
    }

    if (!response.ok) {
      throw new ApiError(
        payload?.message ?? 'Unable to send your message. Please try again.',
        {
          status: response.status,
          fieldErrors: payload?.errors ?? null,
        },
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error?.name === 'AbortError') {
      throw new ApiError('The request took too long. Please try again.', { status: 408 });
    }

    // Network failure, CORS rejection, or the backend being asleep.
    throw new ApiError('Unable to reach the server. Please try again.', { status: 0 });
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  health: (options) => request('/health', options),
  contact: (payload, options) => request('/contact', { ...options, method: 'POST', body: payload }),
};
