// client/src/pages/Projects/ProjectsLanding.js
import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';

// Pre-defined options for dropdowns (you can move these to a config file later)
const DEPARTMENTS = ['Finance', 'HR', 'Operations', 'IT', 'Commercial', 'Legal'];
const OWNERS = ['Chris Joy', 'David Elks', 'Jaia Shah', 'Sarah Jones']; // Example names
const STATUSES = ['Upcoming', 'Active', 'Completed', 'On Hold'];

function ProjectsLanding() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the "Add Project" form
  const [newProject, setNewProject] = useState({
    name: '',
    department: '',
    project_lead: '',
    status: 'Planned', // Default status
    start_date: '',    // Optional, good to have in state though
  });

  // --- 1. Fetch Projects on Load ---
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/');
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Handle Form Input Changes ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  // --- 3. Handle "Add Project" Submission ---
  const handleAddProject = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (!newProject.name || !newProject.department || !newProject.project_lead) {
      alert("Please fill in Project Name, Department, and Owner.");
      return;
    }
    //note start date sends null instead of '' for empty dates to avoid 422 error
    try {
      const projectToSubmit = {
          ...newProject,
          id: Date.now().toString(),
         // status: newProject.status === 'Planned' ? 'Upcoming' : newProject.status,
          start_date: newProject.start_date === '' ? null : newProject.start_date
      };

      await api.post('/projects/', projectToSubmit);
      
      // Refresh list and clear form
      fetchProjects();
      setNewProject({
        name: '',
        department: '',
        project_lead: '',
        status: 'Planned',
        start_date: ''
      });
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <div className="fade-in">
      <div className="project-header-container" style={{marginBottom: '2rem'}}>
        <h1>Project Tracker</h1>
        
        {/* --- ADD PROJECT FORM BAR --- */}
        <form onSubmit={handleAddProject} style={{ 
          display: 'flex', 
          gap: '10px', 
          alignItems: 'center', 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={newProject.name}
            onChange={handleInputChange}
            style={{ flex: 2, minWidth: '200px', padding: '8px' }}
          />
          
          <select 
            name="department" 
            value={newProject.department} 
            onChange={handleInputChange}
            style={{ flex: 1, minWidth: '150px', padding: '8px' }}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>

          <select 
            name="project_lead" 
            value={newProject.project_lead} 
            onChange={handleInputChange}
            style={{ flex: 1, minWidth: '150px', padding: '8px' }}
          >
            <option value="">Select Owner</option>
            {OWNERS.map(project_lead => <option key={project_lead} value={project_lead}>{project_lead}</option>)}
          </select>

          <select 
            name="status" 
            value={newProject.status} 
            onChange={handleInputChange}
            style={{ flex: 1, minWidth: '120px', padding: '8px' }}
          >
             {/* 'Planned' matches your mockup, mapped to 'Upcoming' in backend if needed */}
            <option value="Planned">Planned</option> 
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
          </select>

          <button type="submit" className="btn" style={{whiteSpace: 'nowrap'}}>
            Add Project
          </button>
        </form>
      </div>

      {/* --- FILTER BAR (Visual only for now, can implement logic later) --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <select style={{ padding: '8px' }}><option>All Departments</option></select>
        <select style={{ padding: '8px' }}><option>All Project leads</option></select>
        <select style={{ padding: '8px' }}><option>All Statuses</option></select>
      </div>

      {/* --- PROJECT TABLE --- */}
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Project</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Department</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Project lead</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No projects found. Add one above!
                </td>
              </tr>
            ) : (
              projects.map((proj) => (
                <tr key={proj.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}><strong>{proj.name}</strong></td>
                  <td style={{ padding: '12px' }}>{proj.department}</td>
                  <td style={{ padding: '12px' }}>{proj.project_lead}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`status-badge status-${proj.status.toLowerCase().replace(' ', '-')}`}>
                      {proj.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProjectsLanding;