import { z } from 'zod';

/**
 * Request validation for the contact endpoint.
 *
 * Runs before the controller so an invalid payload never reaches MongoDB or
 * Resend. Trimming doubles as sanitisation: control characters are stripped so
 * a value can never break an email header or corrupt a log line, and every
 * field is escaped again on output by the email template.
 */

// Everything below 0x20 plus DEL. Newlines (0x0A) and tabs (0x09) survive in
// the message so a multi-line message keeps its shape; other fields flatten.
/* eslint-disable no-control-regex -- matching control characters is the point */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const CONTROL_CHARS_KEEP_NEWLINES = /[\u0000-\u0008\u000B-\u001F\u007F]/g;
/* eslint-enable no-control-regex */

/**
 * Builds a trimmed, bounded string field.
 *
 * The messages are attached to the inner pipe, which is the one that actually
 * runs after the transform. Attaching them to an outer pipe would let the
 * default "too small" wording win instead.
 */
const text = ({ min, max, label, keepNewlines = false }) => {
  const required = `${label} is required`;
  const minLabel = min === 1 ? 'character' : 'characters';

  return z
    .string({ error: required })
    .transform((value) =>
      value.replace(keepNewlines ? CONTROL_CHARS_KEEP_NEWLINES : CONTROL_CHARS, '').trim(),
    )
    .pipe(
      z
        .string({ error: required })
        .min(min, `${label} must be at least ${min} ${minLabel}`)
        .max(max, `${label} must be ${max} characters or fewer`),
    );
};

export const contactBodySchema = z
  .object({
    name: text({ min: 2, max: 100, label: 'Name' }),

    email: z
      .string({ error: 'Email is required' })
      .transform((value) =>
        value
          .replace(CONTROL_CHARS, '')
          .trim()
          .toLowerCase(),
      )
      // z.email() extends ZodString, so max() is applied on it directly rather
      // than after a pipe, where the string methods are no longer available.
      .pipe(z.email({ error: 'Enter a valid email address' }).max(254, 'Email must be 254 characters or fewer')),

    subject: text({ min: 3, max: 150, label: 'Subject' }),

    message: text({ min: 10, max: 3000, label: 'Message', keepNewlines: true }),

    // Honeypot. Bots fill every field they find; a real reader never sees it.
    // It stays out of the accessibility tree because it is hidden. It is
    // deliberately *accepted* here rather than rejected: a 422 would tell the
    // bot it had been detected. The controller returns a normal success instead.
    website: z.string().max(500).optional(),
  })
  // Reject unknown keys outright rather than passing them to the model.
  .strict();

/**
 * Flattens a ZodError into `{ fieldName: message }` for the client.
 *
 * Strict-mode rejections carry no field path, so the offending key is read off
 * the issue directly. Without that, an unknown key would return an empty
 * `errors` object and the form would highlight nothing.
 */
export function toFieldErrors(error) {
  const fieldErrors = {};

  for (const issue of error.issues) {
    if (issue.code === 'unrecognized_keys') {
      for (const key of issue.keys ?? []) {
        fieldErrors[key] ??= 'This field is not accepted.';
      }
      continue;
    }

    const key = issue.path[0];
    if (typeof key === 'string' && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }

  return fieldErrors;
}
