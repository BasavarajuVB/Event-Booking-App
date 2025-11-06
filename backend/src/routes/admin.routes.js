import { Router } from 'express';
import { auth, authorize } from '../middlewares/auth.middleware.js';
import { adminReport } from '../controllers/ticket.controller.js';

const router = Router();

router.get('/report', auth, authorize('admin'), adminReport);

export default router;
