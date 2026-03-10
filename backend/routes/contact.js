import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/', (req, res, next) => {
  console.log('=== POST /api/contact received ===');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
}, submitContact);

export default router;
