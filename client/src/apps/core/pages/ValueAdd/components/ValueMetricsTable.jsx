import React from 'react';

/**
 * Renders the "Value add metrics summary" table.
 * Receives the 'va_metrics' list as a prop.
 */
function ValueMetricsTable({ metrics, loading }) {
  
  if (loading) {
    return <p>Loading summary table...</p>;
  }
  
  if (!metrics || metrics.length === 0) {
    return <p>No summary data available.</p>;
  }

  // Helper to format large numbers
  const formatExposure = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return 'N/A';
    return `£${(num / 1_000_000).toLocaleString()}m`;
  };

  return (
    <div>
      <h4>Value add metrics summary</h4>
      <div className="table-responsive-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th>FY</th>
              <th>Exposure</th>
              <th>Number of Cases</th>
              {/* Add more headers if needed */}
            </tr>
          </thead>
          <tbody>
            {metrics.map((row) => (
              <tr key={row.FY} style={{ borderBottom: '1px solid #eee' }}>
                <td>{row.FY}</td>
                <td>{formatExposure(row.Exposure)}</td>
                <td>{row['Number of CLs advised on']}</td>
                {/* Add more cells if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ValueMetricsTable;