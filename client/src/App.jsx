import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. We ONLY import the necessary components from the working path.
// The file is Login.js, NOT Login.jsx
import AppLighthouse from './apps/lighthouse/AppLighthouse'; 
import Login from './apps/lighthouse/Login'; 

function App() {
  // This structure requires the Context (BrowserRouter) to exist higher up
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Catch-all for the main app experience */}
      <Route path="/*" element={<AppLighthouse />} />
    </Routes>
  );
}

export default App;