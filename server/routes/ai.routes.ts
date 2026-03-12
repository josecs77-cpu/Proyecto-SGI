import { Router } from 'express';
import { analyzeContext } from '../controllers/ai.controller.js';

const router = Router();

// Define AI endpoints
router.post('/chat', analyzeContext);

export default router;