import express from 'express';
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateStatus,
  deleteApplication,
  addInterviewRound
} from '../controllers/applicationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All application routes require authentication
router.use(authenticateToken);

router.get('/', getAllApplications);
router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteApplication);
router.post('/:id/interviews', addInterviewRound);

export default router;
