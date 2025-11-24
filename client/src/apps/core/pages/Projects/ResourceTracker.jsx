import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';

// Formatting helper for money
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
};

function ResourceTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ department: '', project_name: '' });
  
  // State to track the clicked row for the narrative
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/projects/resources/', {
            params: { 
                department: filters.department,
                project: filters.project_name 
            }
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching resources", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setSelectedRow(null); // Clear narrative when filters change
  };

  if (loading || !data) return <p>Loading resources...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Project Resource & Cost Tracker</h2>

      {/* --- 1. Slicers --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <select name="department" value={filters.department} onChange={handleFilterChange} style={{ padding: '8px' }}>
            <option value="">All Departments</option>
            {/* Change this: data.filter_options.department.map(...) */}
            {(data.filter_options.department || []).map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select name="project_name" value={filters.project_name} onChange={handleFilterChange} style={{ padding: '8px' }}>
            <option value="">All Projects</option>
            {(data.filter_options.project_name || []).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* --- 2. Dynamic Narrative Box --- */}
      <div style={{ 
          marginBottom: '1.5rem', 
          padding: '1.5rem', 
          backgroundColor: '#e3f2fd', // Light blue
          borderLeft: '5px solid #2196f3',
          borderRadius: '4px',
          minHeight: '60px'
      }}>
        {selectedRow ? (
           <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
             For <strong>{selectedRow.project_name}</strong> under <strong>{selectedRow.department}</strong>, 
             we have allotted <strong>{selectedRow.fte_total.toFixed(2)} FTE</strong> at a cost 
             of <strong>{formatCurrency(selectedRow.total_weighted_cost)}</strong>. 
             So far we have engaged <strong>{selectedRow.number_of_contacts} contacts</strong> for 
             a total of <strong>{selectedRow.number_of_engagements} engagements</strong>.
           </p>
        ) : (
           <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>
             Click a row in the table below to view the summary details.
           </p>
        )}
      </div>

      {/* --- 3. Table --- */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Project</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Department</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Cost</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>FTE</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Contacts</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Engagements</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, idx) => (
              <tr 
                key={idx} 
                onClick={() => setSelectedRow(row)} // Set state on click
                style={{ 
                    borderBottom: '1px solid #eee', 
                    cursor: 'pointer', // Hand cursor to indicate clickability
                    backgroundColor: selectedRow === row ? '#fff3e0' : 'transparent' // Highlight active row
                }}
              >
                <td style={{ padding: '12px' }}><strong>{row.project_name}</strong></td>
                <td style={{ padding: '12px' }}>{row.department}</td>
                <td style={{ padding: '12px' }}>{formatCurrency(row.total_weighted_cost)}</td>
                <td style={{ padding: '12px' }}>{row.fte_total.toFixed(1)}</td>
                <td style={{ padding: '12px' }}>{row.number_of_contacts}</td>
                <td style={{ padding: '12px' }}>{row.number_of_engagements}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResourceTracker;