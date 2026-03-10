import express from 'express';
import { getSkills } from '../controllers/skillsController.js';

const router = express.Router();

/**
 * GET /api/skills
 * Get all skills
 */
router.get('/', getSkills);

export default router;
