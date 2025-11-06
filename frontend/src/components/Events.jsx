import React, { useState, useEffect } from 'react';
import api from '../api/api';

function Events({ userRole }) {
  const [events, setEvents] = useState([]);
  const [createData, setCreateData] = useState({ name: '', category: 'concert', date: '', basePrice: '' });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await api.listEvents();
      setEvents(data);
    } catch (err) {
      setResponse({ success: false, data: err });
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (userRole !== 'admin') {
      setResponse({ success: false, data: { message: 'Admin access required' } });
      return;
    }
    setLoading(true);
    setResponse(null);
    try {
      const res = await api.createEvent({
        ...createData,
        date: new Date(createData.date).toISOString(),
        basePrice: Number(createData.basePrice),
      });
      setResponse({ success: true, data: res });
      setCreateData({ name: '', category: 'concert', date: '', basePrice: '' });
      loadEvents();
    } catch (err) {
      setResponse({ success: false, data: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Events</h2>
      
      <div className="grid">
        <div>
          <h3>All Events</h3>
          <button onClick={loadEvents} className="btn" style={{ marginBottom: '1rem' }}>
            Refresh Events
          </button>
          <div className="events-list">
            {events.length === 0 ? (
              <p>No events found</p>
            ) : (
              events.map((event) => (
                <div key={event._id} className="event-card">
                  <h3>{event.name}</h3>
                  <p><strong>Category:</strong> {event.category}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                  <p><strong>Price:</strong> ₹{event.basePrice}</p>
                  <p><strong>ID:</strong> {event._id}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {userRole === 'admin' && (
          <div>
            <h3>Create Event (Admin Only)</h3>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  value={createData.name}
                  onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={createData.category}
                  onChange={(e) => setCreateData({ ...createData, category: e.target.value })}
                  required
                >
                  <option value="concert">Concert</option>
                  <option value="sports">Sports</option>
                  <option value="conference">Conference</option>
                  <option value="comedy">Comedy</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  value={createData.date}
                  onChange={(e) => setCreateData({ ...createData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Base Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={createData.basePrice}
                  onChange={(e) => setCreateData({ ...createData, basePrice: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn" disabled={loading}>
                Create Event
              </button>
            </form>
            {response && (
              <div className={`response-box ${response.success ? 'success' : 'error'}`}>
                {JSON.stringify(response.data, null, 2)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;

