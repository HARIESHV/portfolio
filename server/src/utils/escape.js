/**
 * Escapes text for safe interpolation into the HTML email body.
 *
 * Every field that comes from a visitor is passed through this before it
 * reaches the email template. Without it, a message containing markup would
 * be rendered as HTML by the mail client.
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips CR and LF from a value destined for an email header.
 * Prevents header injection through the reply-to address or the subject line.
 */
export function headerSafe(value) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
}

/** Formats a timestamp for display in the email body. */
export function formatTimestamp(date) {
  return new Date(date).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}
