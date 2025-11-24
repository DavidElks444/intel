// client/src/components/ValueAddSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function SideBarValueAdd({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
    
        <li><Link to="/value-add/introduction">Introduction</Link></li>
        <li><Link to="/value-add/guidance">Guidance</Link></li>
        <li><Link to="/value-add/reporting">Reporting</Link></li>
        <li><Link to="/value-add/best-practice">Best Practice</Link></li>
        <li><Link to="/value-add/version">About & Version Control</Link></li>
        <li><Link to="/value-add/metrics">Metric Calculations</Link></li>
      </ul>
    </aside>
  );
}

export default SideBarValueAdd;