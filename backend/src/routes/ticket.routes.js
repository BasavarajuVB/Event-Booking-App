import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { bookTickets, cancelBooking } from '../controllers/ticket.controller.js';

const router = Router();

router.post('/book', auth, bookTickets);
router.patch('/cancel/:id', auth, cancelBooking);

export default router;


