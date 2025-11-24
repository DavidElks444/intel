// client/src/pages/ValueAdd/components/KpiBox.js
import React from 'react';

/**
 * A simple box to display a single KPI.
 * @param {string} title - The title of the KPI.
 * @param {string|number} value - The value to display.
 * @param {boolean} loading - If true, show a loading state.
 */
function KpiBox({ title, value, loading = false }) {
  
  const style = {
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#fff',
    minHeight: '150px', // Matches your placeholder
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <div style={style}>
      <h4 style={{ margin: 0, color: '#555' }}>{title}</h4>
      {loading ? (
        <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#ccc' }}>...</p>
      ) : (
        <p style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#C70000', margin: 0 }}>
          {value}
        </p>
      )}
    </div>
  );
}

export default KpiBox;