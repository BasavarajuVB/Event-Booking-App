import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked', required: true },
    bookedAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;


