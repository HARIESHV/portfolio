import { Resend } from 'resend';

import { env, isProduction } from '../config/env.js';
import { escapeHtml, headerSafe } from '../utils/escape.js';

/**
 * Resend integration.
 *
 * The API key is instantiated here and never leaves the server process. It is
 * not attached to the Express app, not logged, and not included in any error
 * that reaches the client.
 */

const resend = new Resend(env.RESEND_API_KEY);

function buildHtml({ name, email, subject, message, timestamp }) {
  const rows = [
    ['Name', name],
    ['Email', email],
    ['Subject', subject],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 20px 10px 0;vertical-align:top;white-space:nowrap;font:500 12px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#a1a1aa;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 0;vertical-align:top;font:400 15px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0a0a0b;">
            ${escapeHtml(value)}
          </td>
        </tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New portfolio contact</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">

            <tr>
              <td style="height:4px;background:#c8102e;font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0 0 6px 0;font:500 11px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#c8102e;">
                  New Portfolio Contact
                </p>
                <h1 style="margin:0;font:600 22px/1.3 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:-.02em;color:#0a0a0b;">
                  New message received from your portfolio.
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 32px 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 0 32px;">
                <p style="margin:0 0 8px 0;font:500 11px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a1a1aa;">
                  Message
                </p>
                <div style="padding:16px 18px;background:#fafafa;border:1px solid #e4e4e7;border-left:3px solid #c8102e;border-radius:10px;font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#27272a;white-space:pre-wrap;word-break:break-word;">
${escapeHtml(message)}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-top:20px;border-top:1px solid #e4e4e7;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#a1a1aa;">
                      Received: ${escapeHtml(timestamp)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText({ name, email, subject, message, timestamp }) {
  return [
    'New message received from your portfolio.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
    '',
    `Received: ${timestamp}`,
  ].join('\n');
}

/**
 * Delivers a contact-form notification.
 *
 * @returns {Promise<{ delivered: boolean, reason?: 'provider' }>}
 *   `delivered: false` means Resend rejected or failed the send. The caller
 *   decides whether that is fatal; the visitor is never told which.
 */
export async function sendContactNotification({ name, email, subject, message, timestamp }) {
  if (!isProduction && env.RESEND_API_KEY.includes('placeholder')) {
    console.log(`[email] [local-dev] RESEND_API_KEY is a placeholder. Simulated notification for <${env.CONTACT_EMAIL}>.`);
    return { delivered: true, id: 'mock-local-notification' };
  }

  const payload = {
    from: env.RESEND_FROM_EMAIL,
    to: [env.CONTACT_EMAIL],
    replyTo: headerSafe(email),
    subject: headerSafe(`New Portfolio Contact: ${subject}`),
    html: buildHtml({ name, email, subject, message, timestamp }),
    text: buildText({ name, email, subject, message, timestamp }),
  };

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    // The provider message is logged for the operator, never returned to the
    // visitor. Logged in full only outside production, where a leaked stack
    // trace is harmless and useful.
    if (isProduction) {
      console.error('[email] Resend rejected the message:', error.name ?? 'unknown error');
    } else {
      console.error('[email] Resend rejected the message:', error);
    }

    return { delivered: false, reason: 'provider' };
  }

  if (!data?.id) {
    console.error('[email] Resend returned no message id.');
    return { delivered: false, reason: 'provider' };
  }

  return { delivered: true, id: data.id };
}

export default sendContactNotification;
