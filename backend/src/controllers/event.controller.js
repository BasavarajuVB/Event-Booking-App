import Event from '../models/event.model.js';

export async function createEvent(req, res) {
  try {
    const { name, category, date, basePrice } = req.body;
    if (!name || !category || !date || basePrice == null) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const event = await Event.create({ name, category, date, basePrice });
    return res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create event' });
  }
}

export async function listEvents(_req, res) {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch events' });
  }
}
