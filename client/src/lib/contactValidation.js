/**
 * Client-side contact form validation.
 *
 * Mirrors the server-side Zod schema so the reader gets an inline message
 * instead of a round trip. The server remains the authority and re-validates
 * every field regardless of what the browser allowed through.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  name: { min: 2, max: 100 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 3000 },
};

export const initialContactValues = { name: '', email: '', subject: '', message: '' };

export function validateField(field, value) {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  switch (field) {
    case 'name': {
      if (!trimmed) return 'Please enter your name.';
      if (trimmed.length < LIMITS.name.min) {
        return `Name must be at least ${LIMITS.name.min} characters.`;
      }
      if (trimmed.length > LIMITS.name.max) {
        return `Name must be ${LIMITS.name.max} characters or fewer.`;
      }
      return '';
    }

    case 'email': {
      if (!trimmed) return 'Please enter your email address.';
      if (trimmed.length > 254 || !EMAIL_PATTERN.test(trimmed)) {
        return 'Please enter a valid email address.';
      }
      return '';
    }

    case 'subject': {
      if (!trimmed) return 'Please enter a subject.';
      if (trimmed.length < LIMITS.subject.min) {
        return `Subject must be at least ${LIMITS.subject.min} characters.`;
      }
      if (trimmed.length > LIMITS.subject.max) {
        return `Subject must be ${LIMITS.subject.max} characters or fewer.`;
      }
      return '';
    }

    case 'message': {
      if (!trimmed) return 'Please enter a message.';
      if (trimmed.length < LIMITS.message.min) {
        return `Message must be at least ${LIMITS.message.min} characters.`;
      }
      if (trimmed.length > LIMITS.message.max) {
        return `Message must be ${LIMITS.message.max} characters or fewer.`;
      }
      return '';
    }

    default:
      return '';
  }
}

export function validateAll(values) {
  return Object.keys(values).reduce(
    (errors, field) => ({ ...errors, [field]: validateField(field, values[field]) }),
    {},
  );
}

export const SUCCESS_MESSAGE = "Message sent successfully. I'll get back to you soon.";
export const ERROR_MESSAGE = 'Unable to send your message. Please try again.';
