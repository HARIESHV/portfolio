import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import contactRoutes from './routes/contactRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { connectDatabase, disconnectDatabase, registerDatabaseListeners } from './config/database.js';
import { env, isProduction } from './config/env.js';

const app = express();

// Behind Render / Railway / Vercel, trust the first proxy hop so req.ip is the
// real client address. Without this, rate limiting groups every visitor into
// one bucket and the whole site is throttled after five messages.
app.set('trust proxy', 1);
app.disable('x-powered-by');

/* -------------------------------------------------------------------------- */
/*  Security headers                                                          */
/* -------------------------------------------------------------------------- */

app.use(
  helmet({
    // This is a pure JSON API, so a restrictive default CSP costs nothing and
    // removes a whole class of injection risk.
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        formAction: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'same-site' },
    referrerPolicy: { policy: 'no-referrer' },
    // No cookies are issued, so HSTS is only meaningful in production.
    hsts: isProduction ? { maxAge: 15552000, includeSubDomains: true } : false,
  }),
);

/**
 * CORS.
 *
 * The allow-list comes from CLIENT_URL and ALLOWED_ORIGINS. An unlisted Origin
 * is rejected outright rather than being reflected back, so this cannot be
 * used as a wildcard.
 */
app.use(
  cors({
    origin(origin, callback) {
      // No Origin header: same-origin, curl, or a health checker. Allowed.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (env.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: false,
    maxAge: 86400,
  }),
);

// Reject a disallowed origin before it reaches a route.
app.use((err, req, res, next) => {
  if (err?.message === 'Origin not allowed') {
    res.status(403).json({ success: false, message: 'Origin not allowed.' });
    return;
  }
  next(err);
});

/* -------------------------------------------------------------------------- */
/*  Parsing                                                                   */
/* -------------------------------------------------------------------------- */

// A small JSON limit is enough for a contact form and blocks large-body abuse.
app.use(express.json({ limit: '16kb' }));

// A URL-encoded fallback covers form posts that skip the JSON content type.
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

app.use(compression());

if (!isProduction) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

/* -------------------------------------------------------------------------- */
/*  Routes                                                                    */
/* -------------------------------------------------------------------------- */

app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'hariesh-v-portfolio-api',
    endpoints: ['GET /api/health', 'POST /api/contact'],
  });
});

app.use('/api', contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*  Boot                                                                      */
/* -------------------------------------------------------------------------- */

const server = app.listen(env.PORT, () => {
  console.log(`[server] listening on port ${env.PORT} (${env.NODE_ENV})`);
  console.log(`[server] CORS allow-list: ${env.allowedOrigins.join(', ')}`);
});

registerDatabaseListeners();

connectDatabase()
  .then(() => {
    console.log('[server] connected to MongoDB');
  })
  .catch((error) => {
    // Not fatal. /api/health reports "degraded" and /api/contact returns 503.
    console.error('[server] MongoDB connection failed:', error.message);
    console.error('[server] starting anyway; contact submissions will return 503');
  });

/* -------------------------------------------------------------------------- */
/*  Shutdown                                                                  */
/* -------------------------------------------------------------------------- */

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`[server] ${signal} received, shutting down`);

  const forceExit = setTimeout(() => {
    console.error('[server] forced exit after 10s');
    process.exit(1);
  }, 10_000);

  forceExit.unref();

  server.close(async () => {
    try {
      await disconnectDatabase();
      console.log('[server] closed cleanly');
      process.exit(0);
    } catch (error) {
      console.error('[server] error during shutdown:', error.message);
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('[server] unhandled rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[server] uncaught exception:', error);
  shutdown('uncaughtException');
});

export default app;
