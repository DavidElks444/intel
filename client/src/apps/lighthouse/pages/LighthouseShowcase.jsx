import React from 'react';
import '../LighthouseTheme.css'; // Import the design system
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- MOCK DATA FOR VIZ ---
const data = [
  { name: 'Q1', value: 400 },
  { name: 'Q2', value: 300 },
  { name: 'Q3', value: 600 },
  { name: 'Q4', value: 200 },
];

// --- REUSABLE COMPONENTS (Design System Atoms) ---

const MetricCard = ({ label, value, subtext }) => (
  <div className="lh-card">
    <div className="lh-label">{label}</div>
    <div className="lh-metric">{value}</div>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '5px' }}>
      {subtext}
    </div>
    {/* Decorative 3D Element (Subtle Gradient Blob) */}
    <div style={{
      position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px',
      background: 'linear-gradient(135deg, var(--brand-soft), transparent)',
      borderRadius: '50%', opacity: 0.3, zIndex: 0
    }} />
  </div>
);

const NarrativeBox = () => (
  <div className="lh-card" style={{ borderLeft: '4px solid var(--brand-primary)' }}>
    <h3 className="lh-h2" style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ background: 'var(--brand-surface)', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--brand-deep)' }}>
        INSIGHT
      </span>
      Resource Allocation Alert
    </h3>
    <p style={{ lineHeight: 1.6, color: 'var(--text-main)' }}>
      The <strong>British Steel Indemnity</strong> project is currently consuming 
      <strong style={{ color: 'var(--brand-primary)' }}> 1.2 FTE</strong>, which is 
      <span style={{ borderBottom: '2px solid var(--brand-soft)' }}>20% higher</span> than the Q3 forecast. 
      Consider rebalancing senior advisor capacity from the <em>Dormant</em> portfolio.
    </p>
  </div>
);

// --- MAIN PAGE ---

function LighthouseShowcase() {
  return (
    <div className="lh-container">
      
      {/* Header Section */}
      <header style={{ marginBottom: '3rem' }}>
        <div className="lh-label">Design System v2.0</div>
        <h1 className="lh-h1">Lighthouse Hub / <span style={{ fontWeight: 300 }}>Project Intelligence</span></h1>
        <p style={{ maxWidth: '600px', color: 'var(--text-light)' }}>
          Demonstrating the "Pastelised Brand" aesthetic with high-impact data visualization 
          and accessible 3D depth cues.
        </p>
      </header>

      {/* 1. KPI ROW (The "3D" Cards) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <MetricCard label="Total Exposure" value="£1.2B" subtext="across 14 active indemnities" />
        <MetricCard label="Active Projects" value="42" subtext="+3 from last month" />
        <MetricCard label="Resource Gap" value="3.5 FTE" subtext="Critical shortage in Legal" />
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Col: Data Viz & Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Narrative Component */}
          <NarrativeBox />

          {/* Chart Component (Clean, Tufte Style) */}
          <div className="lh-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 className="lh-h2" style={{ margin: 0 }}>Activity Velocity</h2>
              <div className="lh-label">Fiscal Year 24/25</div>
            </div>
            
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-light)', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-light)', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'var(--brand-surface)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-2)' }}
                  />
                  {/* The Pastelised Red Bars */}
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? 'var(--brand-primary)' : 'var(--brand-soft)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'center' }}>
              <span style={{ color: 'var(--brand-primary)', fontWeight: 'bold' }}>■</span> Q3 Peak driven by FINTAG intake
              &nbsp;&nbsp;
              <span style={{ color: 'var(--brand-soft)', fontWeight: 'bold' }}>■</span> Standard Activity
            </div>
          </div>
        </div>

        {/* Right Col: Table (Data Density) */}
        <div className="lh-card">
          <h2 className="lh-h2">Top Risers</h2>
          <table className="lh-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Dept</th>
                <th style={{ textAlign: 'right' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4,5].map(i => (
                <tr key={i}>
                  <td>Project Alpha {i}</td>
                  <td><span style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>DBT</span></td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                    <span style={{ color: 'var(--brand-primary)' }}>▲</span> 12%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ 
            marginTop: '1.5rem', width: '100%', padding: '12px', 
            background: 'var(--brand-surface)', color: 'var(--brand-deep)', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
          }}>
            View Full Report
          </button>
        </div>

      </section>
    </div>
  );
}

export default LighthouseShowcase;