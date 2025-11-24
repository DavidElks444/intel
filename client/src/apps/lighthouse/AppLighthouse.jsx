import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LighthouseShowcase from './pages/LighthouseShowcase';

import CompareTracker from './pages/CompareTracker';

// ... inside Routes
<Route path="/compare" element={<CompareTracker />} />


const AppLighthouse = () => {
  return (
    <Routes>
      {/* Set Showcase as the home page for Lighthouse */}
        <Route path="/" element={<LighthouseShowcase />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/compare" element={<CompareTracker />} />
    </Routes>
  );
};

export default AppLighthouse;