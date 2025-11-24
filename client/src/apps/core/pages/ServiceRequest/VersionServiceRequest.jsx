// client/src/pages/ServiceRequest/VersionServiceRequest.js
import React from 'react';

function VersionServiceRequest() {
  return (
    // 2. WRAP THE RETURN IN THE LAYOUT
    <div>
    <h2>Service Request (Lens) - Version</h2>
      <div>
        <h2>Version Control</h2>
        <p><strong>Version:</strong> 1.0.0 (React + FastAPI)</p>
        <p><strong>Last Updated:</strong> 2025-10-23</p>
        
        <h3>Changelog</h3>
        <ul>
          <li>v1.0.0 - Initial React/FastAPI build.</li>
          <li>Features: New Request Submission, Request Tracking, Full Request List, About Page, Version Page.</li>
          <li>Backend: FastAPI with Pydantic, CSV storage, and email/Teams notifications.</li>
          <li>Frontend: React with React Router and Axios.</li>
        </ul>
      </div>

    </div>
  );
}

export default VersionServiceRequest;