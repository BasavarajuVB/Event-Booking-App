import React, { useState } from 'react';
import api from '../api/api';

function Tickets({ token }) {
  const [bookData, setBookData] = useState({ eventId: '', quantity: 1 });
  const [cancelId, setCancelId] = useState('');
  const [bookResponse, setBookResponse] = useState(null);
  const [cancelResponse, setCancelResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!token) {
      setBookResponse({ success: false, data: { message: 'Please login first' } });
      return;
    }
    setLoading(true);
    setBookResponse(null);
    try {
      const res = await api.book({
        eventId: bookData.eventId,
        quantity: Number(bookData.quantity),
      });
      setBookResponse({ success: true, data: res });
      setBookData({ eventId: '', quantity: 1 });
    } catch (err) {
      setBookResponse({ success: false, data: err });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    if (!token) {
      setCancelResponse({ success: false, data: { message: 'Please login first' } });
      return;
    }
    setLoading(true);
    setCancelResponse(null);
    try {
      const res = await api.cancel(cancelId);
      setCancelResponse({ success: true, data: res });
      setCancelId('');
    } catch (err) {
      setCancelResponse({ success: false, data: err });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="section">
        <h2>Tickets</h2>
        <p>Please login to book or cancel tickets.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Tickets</h2>
      <div className="grid">
        <div>
          <h3>Book Tickets</h3>
          <form onSubmit={handleBook}>
            <div className="form-group">
              <label>Event ID</label>
              <input
                type="text"
                value={bookData.eventId}
                onChange={(e) => setBookData({ ...bookData, eventId: e.target.value })}
                placeholder="Paste event ID from events list"
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={bookData.quantity}
                onChange={(e) => setBookData({ ...bookData, quantity: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              Book Tickets
            </button>
          </form>
          {bookResponse && (
            <div className={`response-box ${bookResponse.success ? 'success' : 'error'}`}>
              {JSON.stringify(bookResponse.data, null, 2)}
            </div>
          )}
        </div>

        <div>
          <h3>Cancel Booking</h3>
          <form onSubmit={handleCancel}>
            <div className="form-group">
              <label>Booking ID</label>
              <input
                type="text"
                value={cancelId}
                onChange={(e) => setCancelId(e.target.value)}
                placeholder="Paste booking ID from booking response"
                required
              />
            </div>
            <button type="submit" className="btn btn-danger" disabled={loading}>
              Cancel Booking
            </button>
          </form>
          {cancelResponse && (
            <div className={`response-box ${cancelResponse.success ? 'success' : 'error'}`}>
              {JSON.stringify(cancelResponse.data, null, 2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tickets;

