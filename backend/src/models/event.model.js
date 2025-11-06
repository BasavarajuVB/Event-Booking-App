import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['concert', 'sports', 'conference', 'comedy'] },
    date: { type: Date, required: true },
    basePrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
