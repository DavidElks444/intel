import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';
import { Link } from 'react-router-dom';

// --- (formatDate helper function) ---
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  } catch (e) {
    return dateString;
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
};

function CombinedTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    responsible_director: '',
    contact: '',
    source: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // --- 1. Call the "combined" endpoint ---
        const response = await api.get('/projects/combined/', { 
          params: filters 
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch combined projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // 1. Update the filters as before
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  
  if (loading && !data) return <p>Loading tracker...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>No data available.</p>;

  const nameLookup = {};
  if (data.contacts) {
    data.contacts.forEach(c => {
      // Map the email to the formatted name (e.g., "joy.chris@..." -> "Joy, Chris")
      nameLookup[c.email] = c.formatted_name;
    });
  }
  // --- Calculate Aggregates for the default view ---
  const aggregates = data ? data.tasks.reduce((acc, task) => ({
    cost: acc.cost + (task.total_weighted_cost || 0),
    fte: acc.fte + (task.fte_total || 0),
    engagements: acc.engagements + (task.number_of_engagements || 0),
    contacts: acc.contacts + (task.number_of_contacts || 0)
  }), { cost: 0, fte: 0, engagements: 0, contacts: 0 }) : null;
  
  
  return (
    <div>
      <h2>Combined Project Tracker</h2>
      
      {/* --- 2. Filter bar (uses 'data.filter_options') --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        
        {/* --- Department Slicer --- */}
        <select name="department" value={filters.department} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Departments</option>
          {data.filter_options.department.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        {/* --- Responsible Director Slicer --- */}
        <select name="responsible_director" value={filters.responsible_director} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Directors</option>
          {data.filter_options.responsible_director.map(director => (
            <option key={director} value={director}>{director}</option>
          ))}
        </select>
        
        
        
        {/* --- Status Slicer --- */}
        <select name="status" value={filters.status} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Statuses</option>
           {data.filter_options.status.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select name="source" value={filters.source} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Sources</option>
          {/* This 'source' list now comes from the backend API */}
          {data.filter_options.source.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
        {/* --- Contact Slicer --- */}
        <select name="contact" value={filters.contact} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Contacts</option>
          {/* This .map() is probably where your error is */}
          {data.contacts.map(contact => (
            <option key={contact.email} value={contact.email}>
              {contact.formatted_name}
            </option>
          ))}
        </select> 
        {/* --- Source Slicer --- */}
        <select name="source" value={filters.source} onChange={handleFilterChange} style={{ padding: '8px' }}>
          <option value="">All Sources</option>
          {data.filter_options.source.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>

        {/* --- 1. SPACER: This div will grow to push buttons to the right --- */}
        <div style={{ flexGrow: 1 }}></div>

        {/* --- 2. PLACEHOLDER BUTTONS --- */}
        <button
          style={{
            padding: '8px 12px',
            background: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: '#999',
            cursor: 'not-allowed'
          }}
          disabled
        >
          Add Project
        </button>
        <button
          style={{
            padding: '8px 12px',
            background: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: '#999',
            cursor: 'not-allowed'
          }}
          disabled
        >
          Edit Project
        </button>

      </div> 
      {/* --- Narrative Panel --- */}
      <div style={{ 
          marginBottom: '1.5rem', 
          padding: '1.5rem', 
          backgroundColor: selectedRow ? '#e3f2fd' : '#f5f5f5', // Blue if selected, Grey if aggregate
          borderLeft: selectedRow ? '5px solid #2196f3' : '5px solid #999',
          borderRadius: '4px',
          transition: 'all 0.3s ease',
          minHeight: '60px'
      }}>
        {selectedRow ? (
           /* --- VIEW 1: SINGLE ROW SELECTED --- */
           <div>
             <h3 style={{ marginTop: 0, color: '#1565c0' }}>{selectedRow.project_name}</h3>
             <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
               This <strong>{selectedRow.status}</strong> project under <strong>{selectedRow.department}</strong> 
               (Dir: {selectedRow.responsible_director || 'N/A'}) has an allotment of 
               <strong> {selectedRow.fte_total.toFixed(2)} FTE</strong> at a cost of 
               <strong> {formatCurrency(selectedRow.total_weighted_cost)}</strong>.
               <br/>
               Activity: <strong>{selectedRow.number_of_engagements} engagements</strong> with 
               <strong> {selectedRow.number_of_contacts} contacts</strong>.
             </p>
             <button 
               onClick={() => setSelectedRow(null)}
               style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer', background: 'none', border: '1px solid #1565c0', borderRadius: '4px', color: '#1565c0'}}
             >
               Close Details / Show Aggregates
             </button>
           </div>
        ) : (
           /* --- VIEW 2: AGGREGATE SUMMARY (DEFAULT) --- */
           <div>
             <h3 style={{ marginTop: 0, color: '#333' }}>Current View Summary</h3>
             <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
               Across these <strong>{data.tasks.length} projects</strong>, the total resource allocation is 
               <strong> {aggregates?.fte.toFixed(1)} FTE</strong> with a total weighted cost of 
               <strong> {formatCurrency(aggregates?.cost)}</strong>.
               <br/>
               Total Activity: <strong>{aggregates?.engagements} engagements</strong> involving 
               <strong> {aggregates?.contacts} total stakeholder interactions</strong>.
             </p>
           </div>
        )}
      </div>

      {/* --- 3. Table (uses 'data.tasks' and 'HarmonizedTask' fields) --- */}
      <div className="table-responsive-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Project Name</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Source</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Department</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Responsible owner</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Date</th>
              
             <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>FTE</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Cost</th>
              
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Contacts</th>
              
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>Loading...</td></tr>
            ) : data.tasks.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No projects found.</td></tr>
            ) : (
              data.tasks.map((task, index) => (
                <tr 
                key={index} 
                onClick={() => setSelectedRow(task)} // <-- THIS IS THE MISSING LINK
                style={{ 
                  borderBottom: '1px solid #eee', 
                  cursor: 'pointer', // Shows a hand icon so users know it's clickable
                  backgroundColor: selectedRow === task ? '#fff3e0' : 'transparent' // Highlights the active row
                }}
              >
                  <td style={{ padding: '12px' }}><strong>{task.project_name || 'N/A'}</strong></td>
                  <td style={{ padding: '12px' }}>{task.source || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{task.department || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{task.responsible_director || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{task.status || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{formatDate(task.activity_date)}</td>
                  <td style={{ padding: '12px' }}>{task.fte_total?.toFixed(2)}</td>
                  <td style={{ padding: '12px' }}>{formatCurrency(task.total_weighted_cost)}</td>
                  
                  <td style={{ padding: '12px' }}>...</td>
                  <td style={{ padding: '12px' }}>
                  {/* Split string by spaces, map emails to names, and join with commas */}
                  {task.contacts.split(/\s+/).filter(Boolean).map((email, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      <Link to="/projects/contacts">
                        {nameLookup[email] || email} {/* Fallback to email if name not found */}
                      </Link>
                    </span>
                  ))}
                </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CombinedTracker;