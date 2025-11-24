import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import './ActivitySummary.css'; 
import HelpRequestForm from './HelpRequestForm';
// --- Helper component for rendering "Top 3" lists ---
// (We put this in the same file for simplicity)
const Top3List = ({ title, data }) => {
  // Converts { "Item A": 10, "Item B": 8 } into an array [ ["Item A", 10], ["Item B", 8] ]
  const entries = Object.entries(data);

  return (
    <div className="kpi-card">
      <h4>{title}</h4>
      {entries.length === 0 ? (
        <p>No data</p>
      ) : (
        <ol className="kpi-list">
          {entries.map(([item, count]) => (
            <li key={item}>
              <strong>{item}</strong>
              <span className="kpi-count">{count}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
// --- Helper to format "2025Q3" -> "2024/25 Q3" ---
const formatFiscalLabel = (tickStr) => {
  if (!tickStr || typeof tickStr !== 'string') return tickStr;
  
  // Logic: Pandas "2025Q3" means Fiscal Year ending 2025.
  // So we want to show "2024/25 Q3".
  const parts = tickStr.split('Q');
  if (parts.length === 2) {
    const year = parseInt(parts[0], 10);
    const quarter = parts[1];
    const prevYear = year - 1;
    const shortYear = year.toString().slice(-2); // Get last 2 digits
    return `${prevYear}/${shortYear} Q${quarter}`;
  }
  return tickStr;
};


// --- Helper for rendering simple breakdown tables ---
const BreakdownTable = ({ title, data }) => {
  const entries = Object.entries(data);
  const total = entries.reduce((acc, [, count]) => acc + count, 0);

  return (
    <div className="kpi-card">
      <h4>{title}</h4>
      <table className="kpi-table">
        <tbody>
          {entries.map(([item, count]) => (
            <tr key={item}>
              <td>{item}</td>
              {/* Check if 'data' is a percentage dict */}
              <td>{count > 1 ? count : `${(count * 100).toFixed(0)}%`}</td>
            </tr>
          ))}
          {/* Add a total row if it's not a percentage */}
          {total > 1 && (
            <tr className="kpi-total">
              <td>Total</td>
              <td>{total}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// --- Helper for "Actionable" single-stat cards - doesn't have a sub-lbale this time, but adds ---
const KpiStat = ({ title, value, onClick, isActive }) => (
  <div 
    className={`kpi-card kpi-stat ${isActive ? 'active-kpi' : ''}`} 
    onClick={onClick}
    style={{ cursor: 'pointer', border: isActive ? '2px solid #9A2A2A' : '1px solid #e0e0e0' }}
  >
    <div className="kpi-stat-value">{value}</div>
    <div className="kpi-stat-label">
      {title} <span style={{ fontSize: '0.8rem', color: '#666' }}>(Click to view)</span>
    </div>
  </div>
);


// --- Main Summary Component ---
function ActivitySummary() {
  const [summaryData, setSummaryData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //add to provide details for dropbox
  const [activeListType, setActiveListType] = useState(null); // 'owner' or 'stakeholder' or null

  // Helper to toggle lists
  const toggleList = (type) => {
    if (activeListType === type) {
      setActiveListType(null); // Close if clicking the same one
    } else {
      setActiveListType(type); // Open new one
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Get the summary KPIs
        const summaryResponse = await api.get('/projects/combined/', {
          params: { status: '', department: '', owner: '', contact: '' }
        });
        setSummaryData(summaryResponse.data.summary);
        
        // 2. Get the chart data
        const chartResponse = await api.get('/projects/combined-activity/');
        
        // Pivot the data for the stacked bar chart
        const pivotedData = chartResponse.data.activity_over_time.reduce((acc, item) => {
          const quarter = item.fiscal_quarter;
          if (!acc[quarter]) {
            acc[quarter] = { fiscal_quarter: quarter };
          }
          acc[quarter][item.source] = item.task_count;
          return acc;
        }, {});
        
        setChartData(Object.values(pivotedData));
        setError(null);
        
      } catch (err) {
        console.error("Failed to fetch summary data:", err);
        setError("Failed to load summary.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Runs once on page load

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!summaryData) return <p>No summary data available.</p>;

  const s = summaryData;

  return (
    <div className="summary-container">
      <h2>Activity Summary</h2>
      
      {/* --- 1. The Narrative Box (now using new data) --- */}
      <div className="narrative-box">
        <p>
          Data from <strong>{s.start_date}</strong> to <strong>{s.end_date}</strong>.
        </p>
        <p>
          The most complex project is 
          <strong> {s.top_project_by_stakeholders} </strong>
          with <strong>{s.top_project_stakeholder_count}</strong> stakeholders.
        </p>
      </div>

      {/* --- 2. Updated Actionable Insights (Simpler Headers) --- */}
    
      <h3>Actionable Insights</h3>
      <div className="kpi-grid">
        <KpiStat 
          value={s.projects_missing_owner}
          title="Projects missing an owner"
          onClick={() => toggleList('owner')} // <-- This uses the function
          isActive={activeListType === 'owner'}
        />
        <KpiStat 
          value={s.projects_no_stakeholders}
          title="Projects missing an attached stakeholder"
          onClick={() => toggleList('stakeholder')} // <-- This uses the function
          isActive={activeListType === 'stakeholder'}
        />
      </div>
      {/* --- THE DRILL-DOWN LIST SECTION --- */}
      {activeListType && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#fff', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ marginTop: 0, color: '#9A2A2A' }}>
            {activeListType === 'owner' ? "Projects Missing Owner" : "Projects With No Stakeholders"}
          </h4>
          
          {(activeListType === 'owner' ? s.missing_owner_projects : s.no_stakeholder_projects).length === 0 ? (
            <p>None found!</p>
          ) : (
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {(activeListType === 'owner' ? s.missing_owner_projects : s.no_stakeholder_projects).map((name, idx) => (
                <li key={idx} style={{ padding: '4px 0' }}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* --- 3. Updated Top 3 Breakdowns (Segmented) --- */}
      <h3>Top 3 Breakdowns</h3>
      
      
      {/* We'll use a grid to show the three states side-by-side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Active Column */}
        <div>
          <h4 style={{ color: '#2e7d32', borderBottom: '2px solid #2e7d32', paddingBottom: '5px' }}>Active</h4>
          <Top3List title="Directors" data={s.top_3_director_active} />
          <div style={{ height: '1rem' }}></div>
          <Top3List title="Owners" data={s.top_3_owner_active} />
          <div style={{ height: '1rem' }}></div>
          <Top3List title="Departments" data={s.top_3_dept_active} />
        </div>

        {/* Complete Column */}
        <div>
           <h4 style={{ color: '#1565c0', borderBottom: '2px solid #1565c0', paddingBottom: '5px' }}>Complete</h4>
           <Top3List title="Directors" data={s.top_3_director_complete} />
           <div style={{ height: '1rem' }}></div>
           <Top3List title="Owners" data={s.top_3_owner_complete} />
           <div style={{ height: '1rem' }}></div>
           <Top3List title="Departments" data={s.top_3_dept_complete} />
        </div>

        {/* Dormant Column
        <div>
           <h4 style={{ color: '#ef6c00', borderBottom: '2px solid #ef6c00', paddingBottom: '5px' }}>Dormant*</h4>
           <Top3List title="Directors" data={s.top_3_director_dormant} />
           <div style={{ height: '1rem' }}></div>
           <Top3List title="Owners" data={s.top_3_owner_dormant} />
           <div style={{ height: '1rem' }}></div>
           <Top3List title="Departments" data={s.top_3_dept_dormant} />
        </div> */}
      </div>

      {/* --- 4. Full Breakdowns --- */}
      <h3>Totals & Percentages</h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
        *<em>Dormant refers to projects (predominantly within FinTAG) that are in a position where there is no current activity but has not yet been completed.</em>
      </p>
      <div className="kpi-grid">
        <BreakdownTable title="Activity Status" data={s.status_breakdown} />
        <BreakdownTable title="Activity by Source" data={s.source_breakdown} />
        <BreakdownTable title="Activity by Dept (Percent)" data={s.department_percentage} />
      </div>

      {/* --- 5. The Chart --- */}
      <h3>Activity Over Time (by source)</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* 1. Update XAxis with tickFormatter */}
            <XAxis dataKey="fiscal_quarter" tickFormatter={formatFiscalLabel}>
              <Label value="Date" offset={0} position="insideBottom" dy={10} />
            </XAxis>
            {/* Added Label for Y Axis */}
            <YAxis>
               <Label value="Number of projects" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            <Bar dataKey="FINTAG" stackId="a" fill="#9A2A2A" />
            <Bar dataKey="Corp Gov" stackId="a" fill="#555" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* --- 6. The "What/Why" Help Form --- */}
      <HelpRequestForm />
    </div>
  );
}

export default ActivitySummary;