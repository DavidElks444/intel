// src/index.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
// You likely need BrowserRouter here for the App component to work, 
// unless it's only imported in App.jsx.
import { BrowserRouter } from 'react-router-dom'; 

// 🏆 FIX: MOVE THE AUTHPROVIDER IMPORT HERE (TOP OF FILE)
import { AuthProvider } from './context/AuthContext.jsx'; 

import App from './App.jsx'; 

const container = document.getElementById('root');
const root = createRoot(container);

// The render block should only contain components and rendering logic.
root.render(
    // 1. AuthProvider ensures context is available
    <AuthProvider> 
        {/* 2. The main application */}
        <App />
    </AuthProvider>
);