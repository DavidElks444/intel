// intel/client/src/App.jsx

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load the specific component you want to test
const LoginGate = lazy(() => import('./apps/lighthouse/Login.jsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading Application...</div>}>
      <Routes>
        {/* Set the LoginGate as the catch-all component */}
        <Route path="*" element={<LoginGate />} /> 
      </Routes>
    </Suspense>
  );
}

export default App;