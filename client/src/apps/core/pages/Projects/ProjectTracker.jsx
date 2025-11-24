import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';

// --- 1. Add a simple date formatting helper ---
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // Format to DD/MM/YYYY
    return date.toLocaleDateString('en-GB');
  } catch (e) {
    return dateString; // Return original string if formatting fails
  }
}

function ProjectsTracker() {
  // State for all data from the API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the selected filter values
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    owner: ''
  });

  // --- Fetch Data ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get('/projects/fintag-tracker/', { 
          params: filters 
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filters]); // Re-fetch when filters change

  // --- Handle Filter Changes ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // --- Render Logic ---
  if (loading && !data) return <p>Loading tracker...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div>
      <h2>FINTAG Project Tracker</h2>
      
      {/* --- FILTER BAR --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <select name="department" value={filters.department} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Departments</option>
          {data.filter_options.department.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <select name="owner" value={filters.owner} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Owners</option>
          {data.filter_options.owner.map(owner => (
            <option key={owner} value={owner}>{owner}</option>
          ))}
        </select>
        
        <select name="status" value={filters.status} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Statuses</option>
           {data.filter_options.status.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* --- 2. UPDATED PROJECT TABLE --- */}
      <div className="table-responsive-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Project</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Department</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Task Type</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Owner</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Date Initiated</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Contacts</th>

            </tr>
          </thead>
          <tbody>
    {loading ? (
      <tr><td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>Loading...</td></tr>
    ) : data.projects.length === 0 ? (
      <tr>
        <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          No projects found for the selected filters.
        </td>
      </tr>
    ) : (
      data.projects.map((task, index) => (
        <tr key={task.reference || index} style={{ borderBottom: '1px solid #eee' }}>
          {/* --- THIS IS THE FIX --- */}
          <td style={{ padding: '12px' }}><strong>{task['Name'] || 'N/A'}</strong></td>
          <td style={{ padding: '12px' }}>{task['Department'] || 'N/A'}</td>
          <td style={{ padding: '12px' }}>{task['Task Type'] || 'N/A'}</td>
          <td style={{ padding: '12px' }}>{task['Owner'] || 'N/A'}</td>
          <td style={{ padding: '12px' }}>{task['Status'] || 'N/A'}</td>
          <td style={{ padding: '12px' }}>{formatDate(task['Date Initiated'])}</td>
          <td style={{ padding: '12px', textAlign: 'center' }}>{task.no_contacts}</td>
          {/* --- END FIX --- */}
        </tr>
      ))
    )}
  </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTracker;