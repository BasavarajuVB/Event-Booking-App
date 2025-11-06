import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Events from './components/Events';
import Tickets from './components/Tickets';
import Admin from './components/Admin';
import './App.css';

function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.role) {
        setUserRole(decoded.role);
      }
    } else {
      setUserRole('');
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    const decoded = decodeJWT(newToken);
    if (decoded && decoded.role) {
      setUserRole(decoded.role);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUserRole('');
    localStorage.removeItem('token');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Eventify - Event Booking Platform</h1>
        {token && (
          <div className="header-info">
            <span>Logged in</span>
            {userRole === 'admin' && <span className="badge">Admin</span>}
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        )}
      </header>

      <main className="app-main">
        <Auth onLogin={handleLogin} token={token} />
        <Events userRole={userRole} />
        <Tickets token={token} />
        {userRole === 'admin' && <Admin />}
      </main>
    </div>
  );
}

export default App;

