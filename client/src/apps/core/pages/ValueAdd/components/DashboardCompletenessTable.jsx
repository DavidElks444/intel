// client/src/pages/ValueAdd/components/DashboardCompletenessTable.js
import React from 'react';

// Helper function to format percentage values
const formatPercent = (value) => {
    // Check if value is a valid number
    if (typeof value !== 'number' || isNaN(value)) return 'N/A';
    // Format as percentage with one decimal place
    return `${(value * 100).toFixed(1)}%`;
}

/**
 * Renders the "Data Completeness" table.
 * Receives the 'data_completeness' list as a prop.
 */
function DashboardCompletenessTable({ tableData, loading }) {
  
  return (
    <div>
      <h4>Data Completeness by Fiscal Year</h4>
      <div className="table-responsive-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th>Fiscal year</th>
              <th>Total datapoints</th>
              <th>Completeness</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>Loading...</td>
              </tr>
            ) : !tableData || tableData.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>No completeness data available.</td>
              </tr>
            ) : (
              tableData.map((row) => (
                <tr key={row.FY} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{row.FY || 'N/A'}</td>
                  <td>{row["Total datapoints possible"].toLocaleString() || 'N/A'}</td>
                  <td>{formatPercent(row.Completeness)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardCompletenessTable;