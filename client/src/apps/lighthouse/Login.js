
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // TEMPORARY: This is a safe component to prevent import errors.
    const simulateLogin = () => {
        localStorage.setItem('userRole', 'Admin');
        navigate('/'); // Redirect to main app
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0f4f8' }}>
            <h1>Login Gate (Temporary)</h1>
            <p>Click below to bypass the login and simulate an Admin session.</p>
            <button 
                onClick={simulateLogin} 
                style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                Simulate Login
            </button>
        </div>
    );
};

export default Login;