// client/src/pages/ServiceRequest/LandingServiceRequest.js
import React from 'react';
import { Link } from 'react-router-dom';

import Accordion from '../../../../components/Accordion';
import lens_image from '../../../../img/lens_logo.jpg';

function LandingServiceRequest() {
  return (
    // 2. Wrap the whole page in the sidebar layout
    <div>
    <h2>Service Request (Lens)</h2>  
      <img 
        src={lens_image} 
        alt="Lens Logo" 
        className="service-logo"/>
      <p>This app is the official starting point for requesting new projects from the Data & Analytics team. Its purpose is to streamline the intake process and ensure we have all the necessary information to evaluate and prioritise your request effectively.</p>
      <p><strong>How it works:</strong></p>
      <p><strong>Submit Request:</strong> Fill out the form on the next page with as much detail as possible.</p>
      <p><strong>Team Review:</strong> Your submission will be added to our project pipeline and reviewed by the team.</p>
      <p><strong>Follow Up:</strong> We will contact you to discuss the requirements, scope, and potential timelines.</p>
      

      <hr style={{ margin: '2rem 0' }} />

      {/* --- 2. ADD THE ACCORDION HERE --- */}
      <Accordion title="What We Do vs. What We Don't Do">
        
        {/* 3. Use your existing .about-columns class for the layout inside */}
        <div className="about-columns">
          
          {/* Column 1 */}
          <div>
            <h4>What we don't do ❌</h4>
            <ul>
              <li>Implement pre-determined solutions or provide technical support on externally procured software.</li>
              <li>Maintain your data or collect new data on your behalf long term.</li>
              <li>Work against multiple stakeholders all at once without a set out Governance/decision making structure.</li>
              <li>Undertake desktop research on your behalf, have subject specific insight, nor quality assure subject specific data/analysis.</li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4>What we do ✅</h4>
            <ul>
              <li>Work with you to understand your problem and requirements and use these to provide solution options.</li>
              <li>Help you to develop new functionality and data flows and processes. We will then provide you with the right knowledge on how to maintain this once the product has been implemented.</li>
              <li>Provide support for development of: databases, data flows/management, analytical products, and visualisations.</li>
              <li>Work to pre-agreed timelines.</li>
            </ul>
          </div>

        </div>
      </Accordion>
      
    
    {/* 4. Links to specific actions (using the CSS class) */}
      <div className="service-page-links">

        <Link to="/service-request/new" className="card-link">
          <div className="card-title">Submit new request</div>
          <p>Give us details of the problem you'd like us to solve.</p>
        </Link>
        <Link to="/service-request/all" className="card-link">
          <div className="card-title">View all requests</div>
          <p>See a list of all requests and current progress.</p>
        </Link>
        <Link to="/service-request/track" className="card-link">
          <div className="card-title">Track a request</div>
          <p>Find out more details about a task submitted and its progress.</p>
        </Link>
        </div>
    </div>
      
    
  );
}
export default LandingServiceRequest;