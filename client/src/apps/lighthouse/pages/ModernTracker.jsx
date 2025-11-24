import React, { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig';
import '../LighthouseTheme.css';

const formatCurrency = (val) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);

const getLabel = (key) => {
  const map = { department: 'Departments', responsible_director: 'Directors', status: 'Statuses', source: 'Source Systems' };
  return map[key] || key;
};

// EDIT DRAWER COMPONENT
const EditDrawer = ({ project, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ status: project.status || 'Active', fte_total: project.fte_total || 0, comment: '' });
  return (
    <div className="lh-drawer-overlay" onClick={onClose}>
      <div className="lh-drawer" onClick={e => e.stopPropagation()}>
        <h2 className="lh-h2" style={{color:'var(--brand-primary)'}}>Update Project</h2>
        <p className="lh-label">{project.project_name}</p>
        
        <label className="lh-label">Status</label>
        <select className="lh-select" style={{width:'100%', marginBottom:'1rem'}} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option>Active</option><option>Paused</option><option>Completed</option>
        </select>
        
        <label className="lh-label">FTE Forecast</label>
        <input type="number" step="0.1" className="lh-input" value={formData.fte_total} onChange={e => setFormData({...formData, fte_total: e.target.value})} />
        
        <label className="lh-label">Reason</label>
        <textarea rows="4" className="lh-input" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
        
        <button onClick={() => onSubmit(formData)} style={{marginTop:'auto', padding:'12px', background:'var(--brand-primary)', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'}}>Submit Proposal</button>
      </div>
    </div>
  );
};

// FIELD SCHEMA
const FIELD_SCHEMA = {
  project_name: { label: 'Project Name' },
  status: { label: 'Current Status' },
  department: { label: 'Department' },
  responsible_director: { label: 'Director' },
  fte_total: { label: 'Allocated FTE', format: v => v?.toFixed(2) },
  total_weighted_cost: { label: 'Cost', format: v => formatCurrency(v) },
  source: { label: 'Source System' }
};

function ModernTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('department'); // 'department' or 'source'
  const [editingProject, setEditingProject] = useState(null);
  const [filters, setFilters] = useState({ department: '', responsible_director: '', status: '', source: '' });
  
  const userRole = localStorage.getItem('userRole') || 'Viewer';

  useEffect(() => {
    api.get('/projects/combined/', { params: filters })
       .then(res => { setData(res.data); setLoading(false); })
       .catch(err => console.error(err));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setExpandedIndex(null);
  };

  const handleProposeUpdate = async (updates) => {
    try {
        await api.post('/projects/propose-update', { project_name: editingProject.project_name, ...updates, timestamp: new Date().toISOString() });
        alert("Update queued for Director approval.");
        setEditingProject(null);
    } catch(e) { alert("Error"); }
  };

  const activeFilters = viewMode === 'department' 
    ? ['department', 'responsible_director', 'status'] 
    : ['source', 'status'];

  if (loading || !data) return <div className="lh-container">Loading...</div>;

  return (
    <div className="lh-container">
      <header style={{ marginBottom: '1.5rem' }}>
        <div className="lh-label">Lighthouse View</div>
        <h1 className="lh-h1">Combined Portfolio</h1>
      </header>

      {/* VIEW SWITCHER */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '10px' }}>
        <span className="lh-label" style={{alignSelf:'center', marginRight:'10px'}}>CONTEXT:</span>
        <button onClick={() => setViewMode('department')} style={{padding:'8px 16px', borderRadius:'16px', border:'1px solid #ddd', background: viewMode === 'department' ? 'var(--brand-primary)' : 'white', color: viewMode === 'department' ? 'white' : '#666', cursor:'pointer'}}>Department</button>
        <button onClick={() => setViewMode('source')} style={{padding:'8px 16px', borderRadius:'16px', border:'1px solid #ddd', background: viewMode === 'source' ? 'var(--brand-primary)' : 'white', color: viewMode === 'source' ? 'white' : '#666', cursor:'pointer'}}>Source System</button>
      </div>

      {/* FILTERS */}
      <div className="lh-card lh-filter-bar" style={{ marginBottom: '2rem' }}>
        <span className="lh-label lh-filter-label" style={{ marginRight: '0.5rem' }}>FILTER:</span>
        {activeFilters.map(filter => (
          <select key={filter} name={filter} value={filters[filter]} onChange={handleFilterChange} className="lh-select">
            <option value="">All {getLabel(filter)}</option>
            {(data.filter_options[filter] || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ))}
      </div>

      {/* TABLE */}
      <div className="lh-card" style={{ padding: '0' }}>
        <div style={{ overflowX: 'auto', padding: '1rem' }}>
          <table className="lh-table">
            <thead>
              <tr><th>PROJECT</th><th>{viewMode === 'department' ? 'DEPT' : 'SOURCE'}</th><th>DIRECTOR</th><th>STATUS</th><th style={{textAlign:'right'}}>COST</th></tr>
            </thead>
            <tbody>
              {data.tasks.map((task, idx) => (
                <React.Fragment key={idx}>
                    <tr onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)} className={expandedIndex === idx ? 'lh-row-active' : ''}>
                        <td data-label="Project" style={{fontWeight:600}}>{task.project_name}</td>
                        <td data-label="Dept/Source"><span style={{background:'var(--brand-surface)', padding:'4px 8px', borderRadius:'6px', fontSize:'0.8rem', color:'var(--brand-deep)'}}>{viewMode === 'department' ? task.department : task.source}</span></td>
                        <td data-label="Director">{task.responsible_director}</td>
                        <td data-label="Status">{task.status}</td>
                        <td data-label="Cost" style={{textAlign:'right'}}>{formatCurrency(task.total_weighted_cost)}</td>
                    </tr>
                    {expandedIndex === idx && (
                        <tr className="lh-detail-row">
                            <td colSpan="5">
                                <div className="lh-detail-grid">
                                    {Object.entries(FIELD_SCHEMA).map(([key, config]) => {
                                        const val = task[key];
                                        if (!val || val === 'N/A') return null;
                                        return (<div key={key}><div className="lh-label" style={{fontSize:'0.75rem'}}>{config.label}</div><div style={{fontWeight:600}}>{config.format ? config.format(val) : val}</div></div>);
                                    })}
                                </div>
                                {userRole === 'Editor' && (
                                    <div style={{marginTop:'1rem', textAlign:'right', borderTop:'1px solid #eee', paddingTop:'1rem'}}>
                                        <button onClick={() => setEditingProject(task)} style={{padding:'8px 16px', background:'var(--brand-surface)', border:'1px solid var(--brand-soft)', borderRadius:'8px', cursor:'pointer'}}>✎ Propose Update</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingProject && <EditDrawer project={editingProject} onClose={() => setEditingProject(null)} onSubmit={handleProposeUpdate} />}
    </div>
  );
}
export default ModernTracker;
