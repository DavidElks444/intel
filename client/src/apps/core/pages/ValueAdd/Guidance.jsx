// client/src/pages/ValueAdd/Guidance.js
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig'; 

// Import the layout and ALL components

import Placeholder from '../../../../components/Placeholder';
import InfoBlock from '../../../../components/InfoBlock';
import KpiBox from '../../../../components/KpiBox';
import ValueMetricsTable from './components/ValueMetricsTable';
import NoteBox from '../ServiceRequest/components/Notebox';
import ExposureChart from './components/ExposureChart';

const API_URL = import.meta.REACT_APP_API_URL || 'http://localhost:8000';

function Guidance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2024/25'); // Your slicer state

  // --- 1. UPDATE THE useEffect HOOK ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Send the selectedYear as a URL parameter
        const response = await api.get(`${API_URL}/value-add/metrics`, {
          params: {
            fiscal_year: selectedYear 
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching guidance data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]); // <-- 2. RE-RUN THIS FETCH when selectedYear changes

  return (
    <div><h2>Guidance</h2>


      {/* --- Static Explainer InfoBlocks --- */}
      {/* --- 1. Static Explainer InfoBlocks --- */}

      <InfoBlock title="ASPECT">

        <p>

          <strong>Advise</strong> on new contingent liability and financial transactions

        </p>

      </InfoBlock>



      <InfoBlock title="WHY?">

        <p>

          Improve the management of <strong>fiscal risk</strong> associated with

          contingent liabilities and financial transactions

        </p>

      </InfoBlock>



      <InfoBlock title="HOW?">

        <p>

          Support government to <strong>optimise</strong> the risk of proposals by <strong>advising</strong> on valuations, pricing,

          modelling, structural solutions, risk

          quantification and expected loss calculations

        </p>

      </InfoBlock>



      <hr style={{ margin: '2rem 0' }} />

      {/* --- ADD THE SLICER UI --- */}
    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
      <label htmlFor="fy-slicer" style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
        Fiscal Year:
      </label>
      <select 
        id="fy-slicer" 
        value={selectedYear} 
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {/* Populate this with your actual years */}
        <option value="2021/22">2021/22</option>
        <option value="2022/23">2022/23</option>
        <option value="2023/24">2023/24</option>
         <option value="2024/25">2024/25</option>
      </select>
      </div>

      {/* --- Dynamic Data-Driven Narrative (FIXED) --- */}
      <h3>Key Metrics</h3>
      {loading ? (
        <p>Loading narrative for {selectedYear}...</p>
      ) : data ? (
        <div style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
          <p>
            We advised on
            {/* --- FIX: Removed 'kpi_' prefix --- */}
            <span className="kpi-large">£{data.guidance_advised_bn?.toFixed(1) || 0}bn</span>
            
            {/* --- FIX: Used the correct 'cases' variable --- */}
            of transactions across <span className="kpi-large">{data.total_guidance_cases || 0}</span> cases, leading to:
          </p>
          <ul style={{ listStyleType: "'✓ '", paddingLeft: '1.5em' }}>
            <li>
              An additional
              {/* --- FIX: Removed 'kpi_' prefix --- */}
              <span className="kpi-large">£{data.guidance_savings_m?.toFixed(1) || 0}m</span>
              of savings.
            </li>
            <li>
              A total of
              {/* --- FIX: Removed 'kpi_' prefix --- */}
              <span className="kpi-large">£{data.guidance_risk_reduction_bn?.toFixed(1) || 0}bn</span>
              reduction in risk exposure.
            </li>
            {/* --- FIX: Removed stray text --- */}
          </ul>
        </div>
      ) : (
        <p>Could not load narrative data.</p>
      )}

      <hr style={{ margin: '2rem 0' }} />
      
      {/* --- Context data --- */}
<hr style={{ margin: '2rem 0' }} />

      {/* We reuse the .about-columns class for a responsive 2-column grid */}
      <div className="about-columns">
        
        {/* Column 1: Table */}
        <div>
          <ValueMetricsTable 
            loading={loading}
            metrics={data ? data.va_metrics : []} // Pass the full va_metrics list
          />
        </div>
        
        {/* Column 2: Chart + Note */}
        <div>
          {/* Component 2: Boxplot Placeholder */}
          <ExposureChart loading={loading} data={data ? data.va_metrics : []}/>
          
          {/* Component 3: Note Box */}
          <NoteBox />
        </div>

      </div>

    </div>
  );
}

export default Guidance;