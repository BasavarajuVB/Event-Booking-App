import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendEmail, buildWelcomeEmail } from '../utils/sendEmail.js';

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });

    const welcome = buildWelcomeEmail(user.name);
    const recipients = [user.email, process.env.SUPERADMIN_EMAIL].filter(Boolean).join(',');
    await sendEmail({ to: recipients, subject: welcome.subject, html: welcome.html });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed' });
  }
}
