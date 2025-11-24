import React, { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig'; // Use authenticated API client

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // The 'api' client automatically sends the current user's ID in the header.
        // The backend uses this to decide which projects to send back.
        const response = await api.get('/projects/');
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h2>Projects Portfolio</h2>
      {/* Simple table display */}
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ textAlign: 'left', backgroundColor: '#f0f0f0' }}>
            <th>Project Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Lead</th>
            <th>Confidential?</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.department}</td>
              <td>{p.status}</td>
              <td>{p.project_lead}</td>
              <td>{p.is_confidential ? "🔒 Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList;