import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserSwitcher from './components/UserSwitcher.jsx';
import DynamicSidebar from './components/DynamicSidebar';
import UKGILogo from './img/UKGI_logo.png';
import './apps/lighthouse/LighthouseTheme.css';

// --- LAZY LOAD THE APPS ---
const AppCore = lazy(() => import('./apps/core/AppCore'));
const AppLighthouse = lazy(() => import('./apps/lighthouse/AppLighthouse')); 
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <img src={UKGILogo} alt="UKGI Logo" className="navbar-logo" />
            <span>UKGI Data Platform</span>
          </div>
          <div className="nav-links">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/version" className="nav-link">Version</Link>
            <UserSwitcher />
          </div>
        </nav>

        <div className="container">
          <DynamicSidebar />
          
          <Suspense fallback={<div style={{padding: '2rem'}}>Loading Application...</div>}>
            <Routes>
                <Route path="/lighthouse/*" element={<AppLighthouse />} />

              {/* Core Route: Everything goes here */}
              <Route path="/*" element={<AppCore />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;