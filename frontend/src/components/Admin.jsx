import React, { useState } from 'react';
import api from '../api/api';

function Admin() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    setReport(null);
    try {
      const data = await api.report();
      setReport({ success: true, data });
    } catch (err) {
      setReport({ success: false, data: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Admin Analytics</h2>
      <button onClick={handleGenerateReport} className="btn" disabled={loading}>
        Generate Report
      </button>
      {report && (
        <div className={`response-box ${report.success ? 'success' : 'error'}`}>
          {JSON.stringify(report.data, null, 2)}
        </div>
      )}
    </div>
  );
}

export default Admin;

