import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import { healthCheck, submitContactMessage } from '../controllers/contactController.js';
import { isProduction } from '../config/env.js';

const router = Router();

/**
 * Rate limiter for the contact endpoint.
 *
 * Generous enough that a real person cannot hit it by accident, tight enough
 * that a scripted submitter is stopped quickly. In development the limit is
 * effectively removed so local testing is never blocked.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isProduction ? 5 : 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  // Answers with the same safe message shape as every other error.
  message: {
    success: false,
    message: 'Too many messages sent. Please try again later.',
  },
});

/** Liveness probe. Not rate limited: orchestrators poll it. */
router.get('/health', healthCheck);

router.post('/contact', contactLimiter, submitContactMessage);

export default router;
