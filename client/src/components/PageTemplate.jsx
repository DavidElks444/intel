// client/src/components/PageTemplate.js
import React from 'react';
import { Link } from 'react-router-dom';

// This component wraps the content of your individual pages
// 'children' is a special prop that represents whatever you put *inside* <PageTemplate>
function PageTemplate({ children, pageTitle }) {
  return (
    <div>
      {/* --- Navbar (Consistent across pages) --- */}
      {/* Note: In a larger app, this navbar might become its own component */}
      <nav className="navbar">
        <Link to="/" className="nav-brand">UKGI Data Platform</Link>
        <div className="nav-links">
          {/* Main service links */}
          <Link to="/service-request/new" className="nav-link">New Request</Link>
          <Link to="/service-request/all" className="nav-link">All Requests</Link>
          <Link to="/service-request/track" className="nav-link">Track</Link>
          {/* General links */}
          <Link to="/about" className="nav-link">About Platform</Link>
          <Link to="/version" className="nav-link">Platform Version</Link>
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      <div className="container">
        {/* Optional: Display the page title if provided */}
        {pageTitle && <h2>{pageTitle}</h2>}

        {/* Render the actual page content passed into the template */}
        {children}
      </div>

      {/* Optional: Add a consistent footer here */}
      {/* <footer style={{ textAlign: 'center', marginTop: '2rem', color: '#777' }}>
        <p>&copy; 2025 UKGI Data Platform</p>
      </footer> */}
    </div>
  );
}

export default PageTemplate;