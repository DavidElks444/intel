import React from 'react';
import Plot from 'react-plotly.js';

/**
 * Renders a Box Plot for Exposure over time.
 * @param {Array} data - The va_metrics array from your API
 * @param {boolean} loading - If the data is still loading
 */
function ExposureChart({ data, loading }) {
  
  if (loading) {
    return <p>Loading chart data...</p>;
  }
  
  if (!data || data.length === 0) {
    return <p>No data available for chart.</p>;
  }

  // 1. Extract the "Exposure" data from your va_metrics
  // We just need a single array of all the exposure numbers
  const exposureData = data.map(row => row.Exposure);

  return (
    <div>
      <h4>Exposure distribution over time</h4>
      <Plot
        // 2. Define the Box Plot
        data={[
          {
            y: exposureData, // Use the 'y' axis for a vertical boxplot
            type: 'box',
            name: 'Exposure',
            marker: { color: '#C70000' }, // UKGI Red
            boxpoints: 'all', // Show all the individual data points as outliers
            jitter: 0.3,
            pointpos: -1.8
          }
        ]}
        
        // 3. Set the layout
        layout={{
          autosize: true,
          margin: { l: 40, r: 20, t: 20, b: 20 }, // Adjust margins
          yaxis: {
            title: 'Exposure (£)',
            zeroline: false
          }
        }}
        
        // 4. Make it responsive
        useResizeHandler={true}
        style={{ width: '100%', height: '300px' }}
      />
    </div>
  );
}

export default ExposureChart;