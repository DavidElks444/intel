// client/src/components/Version.js


import React from 'react';

function VersionPlatform() {
  const versions = [
    {
      version: "2.0.0",
      date: "2025-11-20", 
      title: "Architectural Refactor (Hub & Spoke)",
      changes: [
        "ARCH: Refactored Backend into Multi-Hub Monorepo (Core & Lighthouse).",
        "ARCH: Refactored Frontend into Lazy-Loaded Apps architecture."
        
      ]
    },
    {
      version: "1.2.0",
      date: "2025-11-15",
      title: "Project Intelligence",
      changes: [
        "FE: Added Activity Summary Dashboard with Fiscal Year formatting.",
        "FE: Added 'Actionable Insights' with drill-down lists.",
        "BE: Integrated 'Corp Gov' and 'FINTAG' datasets into harmonised models."
      ]
    },
    {
      version: "1.0.0",
      date: "2025-10-23",
      title: "Initial Release",
      changes: [
        "Initial React/FastAPI build.",
        "Features: Request Submission, Request Tracking, Request List.",
        "Backend: FastAPI with Pydantic, CSV storage.",
        "Frontend: React with Router and Axios."
      ]
    }
  ];

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #9A2A2A', paddingBottom: '1rem' }}>
        <h1 style={{ color: '#9A2A2A', margin: 0 }}>Platform Version History</h1>
        <p style={{ color: '#666', marginTop: '5px' }}>
          Current Version: <strong>{versions[0].version}</strong>
        </p>
      </div>

      <div className="version-list">
        {versions.map((v, index) => (
          <div key={index} style={{ marginBottom: '2.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#1a237e' }}>v{v.version} - {v.title}</h3>
              <span style={{ fontSize: '0.9rem', color: '#888', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
                {v.date}
              </span>
            </div>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              {v.changes.map((change, i) => (
                <li key={i} style={{ marginBottom: '5px' }}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VersionPlatform;