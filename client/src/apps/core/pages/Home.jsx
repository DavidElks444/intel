// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';


// The style objects are now removed from this file

function Home() {
  return (
    // We now use className to apply the styles from App.css
    <div>
    
      <h1>UKGI Data Platform</h1>
      <p>Welcome. Please select a service to begin.</p>
      
      <Link to="/service-request/home" className="card-link">
        <div className="card-title">Service Request (Lens)</div>
        <p>Submit, track, and manage new data service requests.</p>
      </Link>
      
      <Link to="/value-add/introduction" className="card-link">
        <div className="card-title">Value Add Dashboard</div>
        <p>View analytics and metrics from the D&A team's work.</p>
      </Link>

      <Link to="/projects" className="card-link">
        <div className="card-title">Projects Portfolio</div>
        <p>Explore the UKGI's current workflow across its functions including Corporate Finance, Corporate Governance and FInTAG.</p>
      </Link>

      <Link to="/contact" className="card-link">
        <div className="card-title">Intelligence Hub</div>
        <p>Explore UKGI's rich database of contacts within UK Government and arms-length bodies.</p>
      </Link>

      <Link to="/theme-sandbox" className="card-link">
        <div className="card-title">Theme sandbox</div>
        <p>Intended merely to prompt a discussion on colour scheme.</p>
      </Link>
    </div>
  );
}

export default Home;