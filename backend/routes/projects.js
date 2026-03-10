import express from 'express';
import { getProjects } from '../controllers/projectsController.js';

const router = express.Router();

/**
 * GET /api/projects
 * Get all projects
 */
router.get('/', getProjects);

export default router;
