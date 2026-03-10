import express from 'express';
import { getTestimonials } from '../controllers/testimonialsController.js';

const router = express.Router();

/**
 * GET /api/testimonials
 * Get all testimonials
 */
router.get('/', getTestimonials);

export default router;
