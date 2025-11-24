// client/src/pages/ServiceRequest/RequestList.js
import React, { useState, useEffect } from 'react';
// 1. Import your new 'api' object
import api from '../../../../api/axiosConfig';


function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // 4. Fix the API call to use 'api' and the correct path
        const response = await api.get('/service-request/all');
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // 5. Wrap everything in a single parent <div>
  return (
    <div>
      <h2>All Submitted Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests submitted yet.</p>
      ) : (
        <div className="request-list">
          {/* We reverse the list to show newest first */}
          {requests.slice().reverse().map(req => (
            <div key={req.request_id} className="request-list-item">
              <div>
                <h4>{req.business_problem.substring(0, 50)}...</h4>
                <p>Submitted by: {req.submitter_name}</p>
                <p>ID: {req.request_id}</p>
              </div>
              <span className={`status ${req.status ? req.status.toLowerCase() : 'pending'}`}>
                {req.status || 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestList;