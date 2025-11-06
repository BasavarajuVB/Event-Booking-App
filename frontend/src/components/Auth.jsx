import React, { useState } from 'react';
import api from '../api/api';

function Auth({ onLogin, token }) {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerResponse, setRegisterResponse] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterResponse(null);
    try {
      const res = await api.register(registerData);
      setRegisterResponse({ success: true, data: res });
      setRegisterData({ name: '', email: '', password: '' });
    } catch (err) {
      setRegisterResponse({ success: false, data: err });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginResponse(null);
    try {
      const res = await api.login(loginData);
      if (res.token) {
        onLogin(res.token);
        setLoginResponse({ success: true, data: res });
        setLoginData({ email: '', password: '' });
      }
    } catch (err) {
      setLoginResponse({ success: false, data: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Authentication</h2>
      <div className="grid">
        <div>
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              Register
            </button>
          </form>
          {registerResponse && (
            <div className={`response-box ${registerResponse.success ? 'success' : 'error'}`}>
              {JSON.stringify(registerResponse.data, null, 2)}
            </div>
          )}
        </div>

        <div>
          <h3>Login</h3>
          {token ? (
            <p className="success">You are logged in!</p>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn" disabled={loading}>
                Login
              </button>
            </form>
          )}
          {loginResponse && (
            <div className={`response-box ${loginResponse.success ? 'success' : 'error'}`}>
              {JSON.stringify(loginResponse.data, null, 2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;

