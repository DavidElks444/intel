// client/src/components/DynamicSidebar.js
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
//import { FaAddressBook } from 'react-icons/fa';

// --- (Your link definitions are the same) ---
const serviceRequestLinks = [
  { name: 'Service Home', path: '/service-request/home' },
  { name: 'New Request', path: '/service-request/new' },
  { name: 'All Requests', path: '/service-request/all' },
  { name: 'Track', path: '/service-request/track' },
  { name: 'About Lens', path: '/service-request/about' },
  { name: 'Version', path: '/service-request/version' },
];

const valueAddLinks = [
  { name: 'Introduction', path: '/value-add/introduction' },
  { name: 'Guidance', path: '/value-add/guidance' },
  { name: 'Reporting', path: '/value-add/reporting' },
  { name: 'Best Practice', path: '/value-add/best-practice' },
  { name: 'About & Version', path: '/value-add/version' },
  { name: 'Metric Calculations', path: '/value-add/metrics' },
];

const projectLinks = [
  { name: 'Activity Summary', path: '/projects' }, 
//  { name: 'Project Tracker (Demo)', path: '/projects/demo' }, 
//  { name: 'FINTAG Tracker', path: '/projects/tracker' },
//  { name: 'Corp Gov Tracker', path: '/projects/corp-gov-tracker' },
  { name: 'Combined Tracker', path: '/projects/combined' },
  { name: 'Contact Directory', path: '/projects/contacts' },
  { name: 'Resource & Cost Tracker', path: '/projects/resource-tracker' },
];

function DynamicSidebar() {
  // --- 1. Add state for hamburger menu ---
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  let linksToShow = null;

  // --- 2. Pick the right links (same as before) ---
  if (location.pathname.startsWith('/service-request')) {
    linksToShow = serviceRequestLinks;
  } else if (location.pathname.startsWith('/value-add')) {
    linksToShow = valueAddLinks;
  } else if (location.pathname.startsWith('/projects')) {
    linksToShow = projectLinks;
  };
  

  // --- 3. If we're not in a service, don't show a sidebar ---
  if (!linksToShow) {
    return null; // Don't render anything
  }

  // --- 4. Render the full sidebar with hamburger ---
  return (
    <>
      {/* This button is only visible on mobile (due to App.css) */}
      <button 
        className="hamburger-menu" 
        onClick={() => setSidebarOpen(true)}
      >
        ☰ Menu
      </button>

      {/* This is the sidebar. It uses the 'open' class to appear on mobile */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Simple "Close" button for mobile */}
        {isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(false)} 
            style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        )}
        <ul>
          {linksToShow.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} onClick={() => setSidebarOpen(false)}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default DynamicSidebar;