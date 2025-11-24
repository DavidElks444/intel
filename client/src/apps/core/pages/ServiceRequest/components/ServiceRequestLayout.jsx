// client/src/pages/ServiceRequest/components/ServiceRequestLayout.js
import React, { useState } from 'react';
import ServiceRequestSidebar from './ServiceRequestSidebar'; // Imports the new sidebar

function ServiceRequestLayout({ children, pageTitle }) {
  // Add state to track if the mobile menu is open
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Create a function to toggle the state
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    // We will use a new, generic CSS class: "service-layout-container"
    <div className="service-layout-container">
      
      <button className="hamburger-menu" onClick={toggleSidebar}>
        ☰
      </button>
      <ServiceRequestSidebar isOpen={isSidebarOpen} />
      <div className="content">
        {pageTitle && <h2>{pageTitle}</h2>}
        {children}
      </div>
    </div>
  );
}

export default ServiceRequestLayout;