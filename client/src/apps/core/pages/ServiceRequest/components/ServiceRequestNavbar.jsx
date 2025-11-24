// client/src/pages/ServiceRequest/components/ServiceRequestNavbar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

function ServiceRequestNavbar() {
  return (
    <nav className="service-nav">
      <div className="service-nav-links">
        <NavLink to="/service-request/home">Service Home</NavLink>
        <NavLink to="/service-request/new">New Request</NavLink>
        <NavLink to="/service-request/all">All Requests</NavLink>
        <NavLink to="/service-request/track">Track</NavLink>
        <NavLink to="/service-request/about">About Lens</NavLink>
        <NavLink to="/service-request/version">Version</NavLink>
      </div>
    </nav>
  );
}

export default ServiceRequestNavbar;