import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './src/app.js';

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
