import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';

// --- 1. Add a simple date formatting helper ---
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  } catch (e) {
    return dateString;
  }
}

function CorpGovTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [filters, setFilters] = useState({
    status_update: '',
    department: '',
    project_leads: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // --- 2. Call the new endpoint ---
        const response = await api.get('/projects/corp-gov/', { 
          params: filters 
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch corp gov projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  if (loading && !data) return <p>Loading tracker...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div>
      <h2>Corporate Governance Project Tracker</h2>
      
      {/* --- 3. Update filter names --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <select name="department" value={filters.department} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Departments</option>
          {(data.filter_options.department || []).map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <select name="project_leads" value={filters.project_leads} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Project Leads</option>
          {(data.filter_options.project_leads || []).map(owner => (
            <option key={owner} value={owner}>{owner}</option>
          ))}
        </select>
        
        <select name="status_update" value={filters.status_update} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Statuses</option>
           {(data.filter_options.status || []).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* --- 4. Update table to match CorpGov data --- */}
      <div className="table-responsive-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Activity</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Workstream</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Project Lead(s)</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>Loading...</td></tr>
            ) : data.tasks.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No projects found.</td></tr>
            ) : (
              data.tasks.map((task, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}><strong>{task.activity || 'N/A'}</strong></td>
                  <td style={{ padding: '12px' }}>{task.workstream || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{task.project_leads || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{task.status_update || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{formatDate(task.start_date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CorpGovTracker;