// client/src/pages/ServiceRequest/TrackProgress.js
import React, { useState } from 'react';
import api from '../../../../api/axiosConfig';


const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000';

function TrackProgress() {
  const [requestId, setRequestId] = useState('');
  const [requestData, setRequestData] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    setRequestData(null);
    setMessage(null);

    try {
      // --- 2. FIX THE API URL ---
      // Your new router prefix is /service-request/
      const response = await api.get(`${API_URL}/service-request/${requestId}`);
      setRequestData(response.data);
    } catch (error) {
      setRequestData(null);
      setMessage({ type: 'error', text: 'Request not found.' });
    }
  };

  // --- 3. WRAP THE RETURN IN THE LAYOUT ---
  return (
    <div>
    <h2>Track Your Request</h2>
      <form onSubmit={handleFetch}>
        <div className="form-group">
          <label>Enter Your Request ID</label>
          <input
            type="text"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            // --- 4. UPDATE PLACEHOLDER ---
            placeholder="Enter your request ID (e.g., 24102025-internal-...)"
            required
          />
        </div>
        <button type="submit" className="btn">Track</button>
      </form>

      {message && (
        <div className={`message ${message.type}`} style={{ marginTop: '1rem' }}>
          {message.text}
        </div>
      )}

      {requestData && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Request Details</h3>
          <p><strong>ID:</strong> {requestData.request_id}</p>
          <p><strong>Status:</strong> {requestData.status}</p>
          <p><strong>Business Problem:</strong> {requestData.business_problem}</p>
          <p><strong>Submitted By:</strong> {requestData.submitter_name}</p>
          <p><strong>Submitted On:</strong> {new Date(requestData.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default TrackProgress;