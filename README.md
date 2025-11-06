## Event Booking App (Eventify) - Full MERN Stack

This repository contains a complete MERN stack application for an Event Ticket Booking Platform with:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React (with Vite)
- Authentication, ticket booking, email notifications via Gmail SMTP, and admin analytics

### Project Structure

```
frontend/
  src/
    components/        # React components (Auth, Events, Tickets, Admin)
    api/              # API client (api.js)
    App.jsx           # Main app component
    index.jsx         # Entry point
  package.json
  vite.config.js

backend/
  src/
    config/           # Database connection
    controllers/      # Route controllers
    middlewares/      # Auth middleware
    models/           # Mongoose models
    routes/           # Express routes
    utils/            # Email utilities
  server.js
  package.json
```

### Quick Start

#### 1. Backend Setup

Create `backend/.env` with:

```
PORT=8080
MONGO_URI=mongodb+srv://Basava:Basava0393@cluster0.5bsgsde.mongodb.net/Todo-Management?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=BasavaVB
GMAIL_USER=youremail@gmail.com
GMAIL_PASS=yourapppassword
SUPERADMIN_EMAIL=kashish.agrahari@masaischool.com
```

Install and run:

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:8080`

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` (Vite dev server)

**Note**: The frontend is configured to proxy API requests to `http://localhost:8080` via Vite proxy settings.

### Features

#### Frontend (React)
- **Separate Components**: Auth, Events, Tickets, Admin (each in its own `.jsx` file)
- **API Client**: All API calls centralized in `src/api/api.js`
- **No HTML in JS**: Pure React JSX components
- **Modern UI**: Clean, responsive design

#### Backend (Node.js + Express)
- JWT authentication
- Role-based access (user/admin)
- MongoDB with Mongoose
- Gmail SMTP email notifications
- Admin analytics with MongoDB aggregation

### API Endpoints

1. **POST** `/api/auth/register` - User registration
2. **POST** `/api/auth/login` - User login (returns JWT)
3. **GET** `/api/events` - List all events (public)
4. **POST** `/api/events` - Create event (admin only)
5. **POST** `/api/tickets/book` - Book tickets (authenticated)
6. **PATCH** `/api/tickets/cancel/:id` - Cancel booking (authenticated)
7. **GET** `/api/admin/report` - Admin analytics report (admin only)

### Email Notifications

Emails are sent via Gmail SMTP for:
- User registration (Welcome email)
- Ticket booking confirmation
- Booking cancellation

All emails are sent to both the user and the super admin (`SUPERADMIN_EMAIL`).

### Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer (Gmail SMTP)
- **Password Hashing**: bcryptjs

---

### Author

**Created by:** Basavaraju VB

**Contact:** If you have any questions or need assistance, please reach out at [bbasavaraju3893@gmail.com](mailto:bbasavaraju3893@gmail.com)
