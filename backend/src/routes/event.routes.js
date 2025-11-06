import { Router } from 'express';
import { createEvent, listEvents } from '../controllers/event.controller.js';
import { auth, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', listEvents);
router.post('/', auth, authorize('admin'), createEvent);

export default router;


