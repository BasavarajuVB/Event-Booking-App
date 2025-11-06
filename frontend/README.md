## Eventify Frontend - React Application

This is a React frontend application built with Vite for the Eventify Event Booking Platform.

### Structure

```
frontend/
  src/
    components/        # React components
      Auth.jsx        # Registration and login
      Events.jsx      # Event listing and creation
      Tickets.jsx     # Ticket booking and cancellation
      Admin.jsx       # Admin analytics report
    api/
      api.js          # API client (all backend API calls)
    App.jsx           # Main application component
    index.jsx         # Entry point
    index.css         # Global styles
    App.css           # Component styles
  index.html          # HTML entry point
  package.json
  vite.config.js
```

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

### API Configuration

The API base URL is configured in `src/api/api.js`. By default, it uses:
- `http://localhost:8080` (or `VITE_API_BASE` environment variable)

The Vite dev server is configured to proxy `/api` requests to `http://localhost:8080` (see `vite.config.js`).

### Features

- **Separate Components**: Each feature has its own React component file
- **Centralized API**: All API calls are in `src/api/api.js`
- **JWT Authentication**: Token stored in localStorage
- **Role-based UI**: Admin features shown only to admin users
- **Responsive Design**: Modern, clean UI

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.
