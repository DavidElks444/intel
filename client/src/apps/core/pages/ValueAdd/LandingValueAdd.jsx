import React from 'react';
import PageTemplate from '../../../../components/PageTemplate'; // Adjust path
import { Link } from 'react-router-dom';

const buttonLinkStyle = { /* ... copy style from Home.js ... */ };

function ValueAddLanding() {
  return (
    <PageTemplate pageTitle="Value Add Dashboard">
      <p>
        This dashboard displays key metrics and analytics related to the Data & Analytics team's value add activities.
      </p>
       <div style={{ textAlign: 'center', marginTop: '2rem' }}>
         {/* Direct link to the main dashboard view */}
         <Link to="/value-add/dashboard" style={buttonLinkStyle}>View Dashboard</Link>
       </div>
      <div style={{ marginTop: '2rem', fontSize: '0.9em', textAlign: 'center' }}>
        <Link to="/value-add/about">About this Dashboard</Link> {/* Link to service-specific about */}
      </div>
    </PageTemplate>
  );
}
export default ValueAddLanding;