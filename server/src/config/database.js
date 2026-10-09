import mongoose from 'mongoose';

import { env, isProduction } from './env.js';

/**
 * MongoDB connection management.
 *
 * The connection is established once at boot and reused for the life of the
 * process. A failed connection does not crash the process: the server still
 * starts, `GET /api/health` reports `degraded`, and the contact endpoint
 * returns a clean 503 in production instead of leaking a driver error to the browser.
 * In development, if a placeholder URI is detected, the server falls back
 * to local storage mode without DNS errors.
 */

let connectionPromise = null;
let lastError = null;

mongoose.set('strictQuery', true);

// A disconnected database must not hold a visitor waiting. Mongoose buffers
// writes while reconnecting; this caps that wait at 2.5s so the controller can
// return a clean 503 instead of the client seeing a 10 second stall.
mongoose.set('bufferTimeoutMS', 2500);

const STATES = ['disconnected', 'connected', 'connecting', 'disconnecting', 'unconnected'];

export function isPlaceholderUri(uri = env.MONGODB_URI) {
  return !uri || uri.includes('placeholder') || uri.includes('not-a-real-cluster');
}

/** True only when MongoDB is genuinely usable right now. */
export function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

export function getConnectionState() {
  if (isPlaceholderUri() && !isProduction && mongoose.connection.readyState === 0) {
    return 'local-fallback';
  }

  const state = mongoose.connection.readyState;

  // readyState is authoritative. `connectionPromise` only disambiguates the
  // short window before mongoose has moved off `unconnected`, and must never
  // be allowed to mask a live `connected` or `disconnected` state.
  if (state === 2) return 'connecting';
  if (state === 0 && connectionPromise) return 'connecting';

  return STATES[state] ?? 'unknown';
}

export function getLastConnectionError() {
  return lastError;
}

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  // In development, if the URI is a placeholder, do not attempt to query a non-existent cluster
  if (isPlaceholderUri() && !isProduction) {
    console.log('[mongo] MONGODB_URI is using a placeholder address.');
    console.log('[mongo] Running in local offline mode: contact submissions will be saved locally to server/data/submissions.json.');
    console.log('[mongo] To connect to a live database, set your MongoDB Atlas connection string in server/.env');
    return null;
  }

  connectionPromise = mongoose
    .connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      autoIndex: !isProduction,
    })
    .then((connection) => {
      lastError = null;
      return connection;
    })
    .catch((error) => {
      lastError = error;
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}

export async function disconnectDatabase() {
  connectionPromise = null;
  if (mongoose.connection.readyState === 0) return;
  await mongoose.connection.close();
}

/**
 * Registers listeners that stop an unhandled connection error from taking the
 * process down. Express handles the request-level failure.
 */
export function registerDatabaseListeners(logger = console) {
  mongoose.connection.on('error', (error) => {
    lastError = error;
    logger.error('[mongo] connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    if (!isPlaceholderUri()) {
      logger.warn('[mongo] disconnected');
    }
  });

  mongoose.connection.on('reconnected', () => {
    lastError = null;
    logger.info('[mongo] reconnected');
  });
}
