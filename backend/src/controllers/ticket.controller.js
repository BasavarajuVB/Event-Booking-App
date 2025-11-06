import Ticket from '../models/ticket.model.js';
import Event from '../models/event.model.js';
import User from '../models/user.model.js';
import { sendEmail, buildBookingEmail, buildCancellationEmail } from '../utils/sendEmail.js';

export async function bookTickets(req, res) {
  try {
    const userId = req.user._id;
    const { eventId, quantity } = req.body;
    if (!eventId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const totalAmount = event.basePrice * Number(quantity);
    const ticket = await Ticket.create({ userId, eventId, quantity, totalAmount });

    const user = await User.findById(userId);
    const emailContent = buildBookingEmail({ eventName: event.name, quantity, totalAmount });
    const recipients = [user.email, process.env.SUPERADMIN_EMAIL].filter(Boolean).join(',');
    await sendEmail({ to: recipients, subject: emailContent.subject, html: emailContent.html });

    return res.status(201).json({ message: 'Tickets booked successfully', bookingId: ticket._id, totalAmount });
  } catch (err) {
    return res.status(500).json({ message: 'Booking failed' });
  }
}

export async function cancelBooking(req, res) {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    if (String(ticket.userId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(200).json({ message: 'Booking already cancelled' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    const event = await Event.findById(ticket.eventId);
    const user = await User.findById(ticket.userId);
    const emailContent = buildCancellationEmail({ eventName: event?.name || 'your event' });
    const recipients = [user.email, process.env.SUPERADMIN_EMAIL].filter(Boolean).join(',');
    await sendEmail({ to: recipients, subject: emailContent.subject, html: emailContent.html });

    return res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Cancellation failed' });
  }
}

export async function adminReport(_req, res) {
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'events',
          localField: 'eventId',
          foreignField: '_id',
          as: 'event',
        },
      },
      { $unwind: '$event' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $match: { status: 'booked' },
      },
      {
        $group: {
          _id: '$event.category',
          bookings: { $sum: 1 },
          totalTickets: { $sum: '$quantity' },
          revenue: { $sum: '$totalAmount' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          bookings: 1,
          totalTickets: 1,
          revenue: 1,
        },
      },
    ];

    const categoryBreakdown = await Ticket.aggregate(pipeline);

    const totals = await Ticket.aggregate([
      { $match: { status: 'booked' } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          users: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          totalBookings: 1,
          totalRevenue: 1,
          totalUsers: { $size: '$users' },
        },
      },
    ]);

    const summaryBase = totals[0] || { totalBookings: 0, totalRevenue: 0, totalUsers: 0 };
    const avgSpendPerUser = summaryBase.totalUsers > 0
      ? Math.round(summaryBase.totalRevenue / summaryBase.totalUsers)
      : 0;

    return res.status(200).json({
      summary: {
        totalBookings: summaryBase.totalBookings,
        totalRevenue: summaryBase.totalRevenue,
        avgSpendPerUser,
      },
      categoryBreakdown,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to generate report' });
  }
}
