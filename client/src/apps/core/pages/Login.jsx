import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  console.log("LOGIN PAGE MOUNTED");
  const navigate = useNavigate();

  const handleLogin = (role, name) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    navigate('/lighthouse/compare');
  };

  const cardStyle = {
    background: 'white', padding: '2rem', borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer',
    border: '1px solid #eee', textAlign: 'center', width: '250px', margin: '10px'
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f4f7f9' }}>
      <h1 style={{ color: '#9A2A2A' }}>UKGI Data Platform</h1>
      <p style={{ color: '#666', marginBottom: '3rem' }}>Select Persona</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={cardStyle} onClick={() => handleLogin('Viewer', 'Guest User')}>
            <h1>👀</h1><h3>Stakeholder</h3><p>Read-Only View</p>
        </div>
        <div style={cardStyle} onClick={() => handleLogin('Editor', 'Project Lead')}>
            <h1>✏️</h1><h3>Project Lead</h3><p>Can Propose Updates</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
