import mongoose from 'mongoose';

/**
 * A contact-form submission.
 *
 * Validation lives here as well as in the request schema: Mongoose is the last
 * line of defence if a future route is added that forgets to validate.
 *
 * `strict: 'throw'` means an unexpected field is an error rather than being
 * silently written to the document.
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must be 100 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email must be 254 characters or fewer'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'Email must be a valid email address',
      ],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters'],
      maxlength: [150, 'Subject must be 150 characters or fewer'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [3000, 'Message must be 3000 characters or fewer'],
    },
  },
  {
    timestamps: true, // Provides createdAt and updatedAt.
    strict: 'throw',
    versionKey: false,
  },
);

// Supports the common case of reading a sender's recent submissions.
contactMessageSchema.index({ createdAt: -1 });

export const ContactMessage =
  mongoose.models.ContactMessage ?? mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
