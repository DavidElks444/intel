import React from 'react';

/**
 * Renders the "Value add metrics summary" table.
 * Receives the 'va_metrics' list as a prop.
 */
function ValueMetricsTable({ metrics, loading }) {
  
  // Helper to format large numbers
  const formatExposure = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return 'N/A';
    // Format as £Xm
    return `£${(num / 1_000_000).toLocaleString('en-GB', { maximumFractionDigits: 0 })}m`;
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
              <th>Number of Cases</th> {/* This header is just text */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : !metrics || metrics.length === 0 ? (
              <tr>
                <td colSpan="3">No summary data available.</td>
              </tr>
            ) : (
              metrics.map((row) => (
                <tr key={row.FY} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{row.FY}</td>
                  <td>{formatExposure(row.Exposure)}</td>
                  {/* This is the fix. We access the correct data key 'Number_of_CLs' 
                    (which matches your Pydantic model) and provide a fallback.
                  */}
                  <td>{row.Number_of_CLs || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ValueMetricsTable;