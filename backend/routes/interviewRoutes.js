import express from 'express';
import { startInterview, submitAnswer } from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/start', protect, startInterview);
router.post('/:id/answer', protect, submitAnswer);

export default router;
