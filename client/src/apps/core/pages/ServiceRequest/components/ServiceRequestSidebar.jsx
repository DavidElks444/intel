// client/src/pages/ServiceRequest/components/ServiceRequestSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function ServiceRequestSidebar({ isOpen }) {
  return (
    // We will reuse the generic "sidebar" CSS class from App.css
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><NavLink to="/service-request/home">Service Home</NavLink></li>
        <li><NavLink to="/service-request/new">New Request</NavLink></li>
        <li><NavLink to="/service-request/all">All Requests</NavLink></li>
        <li><NavLink to="/service-request/track">Track</NavLink></li>
        <li><NavLink to="/service-request/about">About Lens</NavLink></li>
        <li><NavLink to="/service-request/version">Version</NavLink></li>
      </ul>
    </aside>
  );
}

export default ServiceRequestSidebar;