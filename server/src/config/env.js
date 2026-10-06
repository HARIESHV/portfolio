import 'dotenv/config';

import { z } from 'zod';

/**
 * Centralised helper for reading and validating environment variables.
 *
 * Secrets are read once, validated once, and then treated as immutable. The
 * server refuses to start in production with an invalid configuration rather
 * than failing later on the first request that needs the value.
 */

/** Trims, then strips CR/LF so a header value can never be injected. */
function singleLine(value) {
  return typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').trim() : value;
}

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(5000),

    MONGODB_URI: z
      .string({ error: 'MONGODB_URI is required' })
      .min(1, 'MONGODB_URI is required')
      .refine((value) => value.startsWith('mongodb'), {
        message: 'MONGODB_URI must be a MongoDB connection string',
      }),

    RESEND_API_KEY: z
      .string({ error: 'RESEND_API_KEY is required' })
      .min(1, 'RESEND_API_KEY is required')
      .refine((value) => value.startsWith('re_'), {
        message: 'RESEND_API_KEY must be a Resend API key',
      }),

    CONTACT_EMAIL: z
      .email({ error: 'CONTACT_EMAIL must be a valid email address' })
      .default('harieshvenkatachalam@gmail.com'),

    RESEND_FROM_EMAIL: z
      .string({ error: 'RESEND_FROM_EMAIL is required' })
      .min(1)
      .default('Portfolio <onboarding@resend.dev>'),

    CLIENT_URL: z
      .string({ error: 'CLIENT_URL is required' })
      .default('http://localhost:5173')
      .transform(singleLine),

    ALLOWED_ORIGINS: z.string().optional().default(''),
  })
  .transform((env) => ({
    ...env,
    /**
     * CORS allow-list. `CLIENT_URL` is always included so the deployed
     * frontend works even when `ALLOWED_ORIGINS` is left empty.
     */
    allowedOrigins: Array.from(
      new Set(
        [env.CLIENT_URL, ...(env.ALLOWED_ORIGINS ?? '').split(',')]
          .map(singleLine)
          .filter(Boolean),
      ),
    ),
  }));

function fail(report) {
  const details = report.issues
    .map((issue) => `  - ${issue.path.join('.') || 'environment'}: ${issue.message}`)
    .join('\n');

  console.error(`\n[config] Invalid environment configuration:\n${details}\n`);
  throw new Error('Invalid environment configuration. See the messages above.');
}

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) fail(parsed.error);

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
