// client/src/pages/ValueAdd/Reporting.js
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';

// Import the layout and ALL components

import Placeholder from '../../../../components/Placeholder';
import InfoBlock from '../../../../components/InfoBlock';
import KpiBox from '../../../../components/KpiBox';
import DashboardCompletenessTable from './components/DashboardCompletenessTable'; 

const API_URL = import.meta.REACT_APP_API_URL || 'http://localhost:8000';

function Reporting() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2024-2025');

  // --- 1. DEFINE PLACEHOLDER CONSTANTS ---
  const kpi_departments = 18;
  const kpi_pufins = 5;
  const kpi_stakeholders_pct = 75; // You had this as Z%

  // --- (useEffect hook is fine, it fetches all data) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_URL}/value-add/metrics`, {
          params: {
            fiscal_year: selectedYear 
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reporting data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  // --- 2. CALCULATE DYNAMIC KPIs (inside the return) ---
  // We do this here so it re-calculates when 'data' changes
  let latestCompleteness = "N/A";
  let reputationalScore = "N/A";

  if (data) {
    // Find the 'data_completeness' entry for the selected year
    const yearData = data.data_completeness.find(item => item.FY === selectedYear);
    
    if (yearData) {
      latestCompleteness = `${(yearData.Completeness * 100).toFixed(1)}%`;
    }
    // H-Score is your reputational score
    reputationalScore = data.h_score ? data.h_score.toFixed(0) : 'N/A';
  }

  return (
    <div><h2>Reporting</h2>

      {/* --- 3. UPDATED InfoBlock CONTENT --- */}
      <InfoBlock title="ASPECT">
        <p>
          <strong>Annual reporting</strong> on government’s <strong>portfolio</strong> of Contingent Liabilities and Financial Investments
        </p>
      </InfoBlock>

      <InfoBlock title="WHY?">
        <p>
          <strong>Increase</strong> the <strong>fiscal transparency, discipline and monitoring</strong> of contingent liabilities and financial transactions
        </p>
      </InfoBlock>

      <InfoBlock title="HOW?">
        <p>
          <strong>Bringing together data</strong>, and <strong>publishing</strong> reports on, all of HMG’s contingent liabilities and financial transactions. 
          <strong>Analyse</strong> risk concentration and correlation <strong>to inform</strong> HMT views on fiscal policy.
        </p>
      </InfoBlock>

      <hr style={{ margin: '2rem 0' }} />

      {/* --- 4. FIXED Slicer --- */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <label htmlFor="fy-slicer" style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
          Fiscal Year:
        </label>
        <select 
          id="fy-slicer" 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)} // <-- Fixed typo e.g.target
        >
          {/* We can make this dynamic later */}
          <option value="2021-2022">2021-2022</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>

      {/* --- 5. REPLACED Dynamic Narrative & KPIs --- */}
      <h3>Key Metrics</h3>
      {loading ? (
        <p>Loading narrative for {selectedYear}...</p>
      ) : data ? (
        <div style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
          <p>
            We engaged with
            <span className="kpi-large">{kpi_departments}</span>
            departments and
            <span className="kpi-large">{kpi_pufins}</span>
            PuFIns to deliver our reports leading to:
          </p>
          <ul style={{ listStyleType: "'* '", paddingLeft: '1.5em' }}>
            <li>
              Our data completeness is now
              <span className="kpi-large">{latestCompleteness}</span>
            </li>
            <li>
              The reputational score for our publications stayed the same this year at
              <span className="kpi-large">{reputationalScore}</span>
            </li>
            <li>
              <span className="kpi-large">{kpi_stakeholders_pct}%</span>
              of key stakeholders stated that the publications improved financial transparency.
            </li>
          </ul>
        </div>
      ) : (
        <p>Could not load narrative data.</p>
      )}
      
      <hr style={{ margin: '2rem 0' }} />

      {/* --- 6. REPLACED Placeholders --- */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          {/* Use the real table component */}
          <DashboardCompletenessTable loading={loading} tableData={data ? data.data_completeness : []} />
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <KpiBox 
            title="H-Score"
            loading={loading}
            value={reputationalScore}
          />
        </div>
      </div>

      <hr style={{ margin: '2rem 0' }} />
      <Placeholder title="Data Completeness Over Time (Line Chart)" height={300} />

    </div>
  );
}

export default Reporting;