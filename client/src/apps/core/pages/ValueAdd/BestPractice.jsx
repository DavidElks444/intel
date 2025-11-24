import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';

import InfoBlock from '../../../../components/InfoBlock';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const API_URL = import.meta.REACT_APP_API_URL || 'http://localhost:8000';

function BestPractice() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2024/25'); // Slicer state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_URL}/value-add/metrics`, {
          params: { fiscal_year: selectedYear }
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  // Helper to format percentage
  const formatPercent = (value) => `${value.toFixed(0)}%`;

  return (
      <div
      ><h2>Best Practice</h2>
      
      <InfoBlock title="ASPECT">
        <p><strong>Embedding</strong> best practice across government</p>
      </InfoBlock>
      <InfoBlock title="WHY?">
        <p><strong>Upskilling</strong> departments to ensure contingent liabilities and financial transactions are used effectively to <strong>deliver value for money</strong> policy interventions</p>
      </InfoBlock>
      <InfoBlock title="HOW?">
        <p><strong>Produce</strong> specialist guidance notes; <strong>develop</strong> tools to standardise valuation; <strong>conduct</strong> thematic reviews; <strong>recommend</strong> ways to <strong>improve</strong> risk management; and <strong>run</strong> x-Gov network</p>
      </InfoBlock>

      <hr style={{ margin: '2rem 0' }} />

      {/* --- Slicer UI --- */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <label htmlFor="fy-slicer" style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
          Fiscal Year:
        </label>
        <select 
          id="fy-slicer" 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2022/23">2022/23</option>
          <option value="2023/24">2023/24</option>
          <option value="2024/25">2024/25</option>
        </select>
      </div>

      {/* --- Dynamic Data-Driven Narrative --- */}
      <h3>Key Metrics</h3>
      {loading ? (
        <p>Loading narrative for {selectedYear}...</p>
      ) : data ? (
        <div style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
          <p>Our upskilling activities mean that:</p>
          <ul style={{ listStyleType: "'✓ '", paddingLeft: '1.5em' }}>
            <li>
              Our regular network across government is attended by
              <span className="kpi-large">{data.kpi_network_attendance_pct?.toFixed(0) || 0}%</span>
              of departments.
            </li>
            <li>
              <span className="kpi-large">{data.kpi_new_transactions_pct?.toFixed(0) || 0}%</span>
              of new transactions have taken UKGI advice before approaching HMT.
            </li>
            <li>
              Our average relationship score with departments have changed by
              <span className="kpi-large">{data.kpi_relationship_score_change_pct?.toFixed(1) || 0}%</span>.
            </li>
          </ul>
        </div>
      ) : (
        <p>Could not load narrative data.</p>
      )}

      <hr style={{ margin: '2rem 0' }} />
      
      {/* --- Real Charts --- */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Chart 1: Workflow Proportion (Bar Chart) */}
        <div style={{ flex: 1, minWidth: '400px' }}>
          <h4>Proportion of all cases brought by department</h4>
          {loading ? <p>Loading chart...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.workflow_proportion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter_start_date" />
                <YAxis tickFormatter={formatPercent} />
                <Tooltip formatter={(value) => formatPercent(value * 100)} />
                <Legend />
                <Bar dataKey="NOT_UKGI_HMT" name="Not UKGI/HMT" fill="#C70000" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Chart 2: FIT Attendance (Line Chart) */}
        <div style={{ flex: 1, minWidth: '400px' }}>
          <h4>Attendance at FIT meetings over time</h4>
          {loading ? <p>Loading chart...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.fit_pivot_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fiscal_quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_attendees" name="All Attendees" stroke="#8884d8" />
                <Line type="monotone" dataKey="not_ukgi_attendees" name="Attendees (non-UKGI)" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
   </div>
  );
}

export default BestPractice;