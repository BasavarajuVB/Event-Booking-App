## Eventify Backend (Node + Express + MongoDB)

### Setup

1. Create a `.env` in `backend/` with:

```
PORT=8080
MONGO_URI=mongodb+srv://Basava:Basava0393@cluster0.5bsgsde.mongodb.net/Todo-Management?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=BasavaVB
GMAIL_USER=youremail@gmail.com
GMAIL_PASS=yourapppassword
SUPERADMIN_EMAIL=kashish.agrahari@masaischool.com
```

2. Install and run:

```
cd backend
npm install
npm run dev
```

### API Routes

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/events` (public)
- POST `/api/events` (admin)
- POST `/api/tickets/book` (auth)
- PATCH `/api/tickets/cancel/:id` (auth)
- GET `/api/admin/report` (admin)


