import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

import { ContactMessage } from '../models/ContactMessage.js';
import { sendContactNotification } from '../services/emailService.js';
import { contactBodySchema, toFieldErrors } from '../utils/contactSchema.js';
import { AppError, serviceUnavailable } from '../utils/AppError.js';
import { formatTimestamp } from '../utils/escape.js';
import { isProduction } from '../config/env.js';
import { getConnectionState, getLastConnectionError, isDatabaseReady } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SUBMISSIONS_FILE = path.resolve(__dirname, '../../data/submissions.json');

const SUCCESS_MESSAGE = "Message sent successfully. I'll get back to you soon.";
const GENERIC_FAILURE = 'Unable to send your message. Please try again.';

async function saveLocalSubmission(record) {
  try {
    await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
    let existing = [];
    try {
      const data = await fs.readFile(SUBMISSIONS_FILE, 'utf8');
      existing = JSON.parse(data);
    } catch {
      existing = [];
    }
    existing.push(record);
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2), 'utf8');
  } catch (err) {
    console.error('[contact] unable to save local submission:', err.message);
  }
}

/**
 * POST /api/contact
 *
 * 1. Validate and sanitise the payload.
 * 2. Persist it to MongoDB (or local file in development mode).
 * 3. Notify via Resend.
 * 4. Return a single user-facing string.
 *
 * The visitor never receives a stack trace, a Mongo error, or a Resend error.
 */
export async function submitContactMessage(req, res, next) {
  try {
    const parsed = contactBodySchema.safeParse(req.body);

    if (!parsed.success) {
      // 422: the request was understood, but the fields are not usable.
      throw new AppError('Please check the highlighted fields.', 422, {
        details: toFieldErrors(parsed.error),
      });
    }

    const { name, email, subject, message } = parsed.data;

    // Honeypot tripped. Answer exactly as a success would, so a bot gets no
    // signal that it was detected, and never touch the database.
    if (parsed.data.website) {
      res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
      return;
    }

    let record;
    if (isDatabaseReady()) {
      try {
        record = await ContactMessage.create({ name, email, subject, message });
      } catch (error) {
        // A Mongoose validation error is the model's own last line of defence.
        if (error?.name === 'ValidationError') {
          console.warn('[contact] rejected by model validation');
          throw new AppError('Please check the highlighted fields.', 422, {
            details: Object.fromEntries(
              Object.entries(error.errors ?? {}).map(([field, detail]) => [
                field,
                detail?.message ?? 'Invalid value',
              ]),
            ),
          });
        }

        console.error('[contact] could not persist the message:', error.message);
        throw serviceUnavailable();
      }
    } else if (!isProduction) {
      // Local development fallback: store in local JSON file and log to console
      record = {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      };
      await saveLocalSubmission(record);
      console.log(`[contact] [local-dev] Received submission from "${name}" <${email}>: "${subject}"`);
    } else {
      console.warn('[contact] rejected: database not connected');
      throw serviceUnavailable();
    }

    // Attempt notification; failure does not abort an already saved message
    try {
      await sendContactNotification({
        name: record.name,
        email: record.email,
        subject: record.subject,
        message: record.message,
        timestamp: formatTimestamp(record.createdAt),
      });
    } catch (error) {
      console.error('[contact] notification failed:', error.message);
    }

    res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    console.error(
      isProduction
        ? '[contact] unexpected failure'
        : `[contact] unexpected failure: ${error?.stack ?? error}`,
    );

    next(new AppError(GENERIC_FAILURE, 500));
  }
}

/**
 * GET /api/health
 *
 * Reports process liveness and whether MongoDB is currently usable. Never
 * exposes the connection string, the API key, or any driver internals.
 */
export async function healthCheck(req, res) {
  const state = getConnectionState();
  const databaseUp = mongoose.connection.readyState === 1;

  res.status(databaseUp || (!isProduction && state === 'local-fallback') ? 200 : 503).json({
    status: databaseUp ? 'ok' : (!isProduction && state === 'local-fallback' ? 'local-dev' : 'degraded'),
    service: 'hariesh-v-portfolio-api',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    database: {
      state,
      connected: databaseUp,
      // A message, never a URI.
      error: databaseUp ? null : (getLastConnectionError()?.message ?? null),
    },
  });
}

export default submitContactMessage;
