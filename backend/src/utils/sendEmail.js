import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, html }) {
  const from = `Eventify <${process.env.GMAIL_USER}>`;
  await transporter.sendMail({ from, to, subject, html });
}

export function buildWelcomeEmail(name) {
  return {
    subject: 'Welcome to Eventify 🎉',
    html: `
      <h3>Welcome to Eventify 🎉</h3>
      <p>Hello ${name}, your account has been created successfully!</p>
    `,
  };
}

export function buildBookingEmail({ eventName, quantity, totalAmount }) {
  return {
    subject: 'Eventify - Booking Confirmed',
    html: `
      <h3>Eventify - Booking Confirmed </h3>
      <p>Your booking is confirmed!</p>
      <p><strong>Event:</strong> ${eventName}</p>
      <p><strong>Tickets:</strong> ${quantity}</p>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    `,
  };
}

export function buildCancellationEmail({ eventName }) {
  return {
    subject: 'Eventify - Booking Cancelled',
    html: `
      <h3>Eventify - Booking Cancelled </h3>
      <p>Your booking for <strong>${eventName}</strong> has been cancelled.</p>
    `,
  };
}


