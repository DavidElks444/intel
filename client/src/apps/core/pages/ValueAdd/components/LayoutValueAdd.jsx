// client/src/pages/ValueAdd/components/ValueAddLayout.js
import React, { useState } from 'react';
import SideBarValueAdd from './SideBarValueAdd'; // Imports the sidebar

function LayoutValueAdd({ children, pageTitle }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    // This div provides the flex layout (sidebar + content)
    // It sits *inside* the .container from App.js
    <div className="value-add-layout">
      <button className="hamburger-menu" onClick={toggleSidebar}>
        ☰
      </button>
      <SideBarValueAdd isOpen={isSidebarOpen} />
      <div className="content">
        {pageTitle && <h2>{pageTitle}</h2>}
        {children}
      </div>
    </div>
  );
}

export default LayoutValueAdd;