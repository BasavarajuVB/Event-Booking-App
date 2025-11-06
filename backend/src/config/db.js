import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  // eslint-disable-next-line no-console
  console.error('MONGO_URI is not set in environment variables');
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
    autoIndex: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error('MongoDB connection error:', err.message));

export default mongoose;