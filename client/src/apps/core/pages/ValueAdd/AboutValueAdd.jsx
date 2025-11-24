// client/src/components/About.js
import React from 'react';

function About() {
  return (
    <div>
      <h2>About the UKGI Project Gateway</h2>
      <p>
        This app is the official starting point for requesting new projects from the Data & Analytics team. Its purpose is to streamline the intake process and ensure we have all the necessary information to evaluate and prioritise your request effectively.
      </p>

      <h3>How it works:</h3>
      <ul>
        <li><strong>Submit Request:</strong> Fill out the form on the 'New Request' page with as much detail as possible.</li>
        <li><strong>Team Review:</strong> Your submission will be added to our project pipeline and reviewed by the team.</li>
        <li><strong>Follow Up:</strong> We will contact you to discuss the requirements, scope, and potential timelines.</li>
      </ul>

      <hr style={{ margin: '2rem 0' }} />

      <div className="about-columns">
        <div>
          <h3>What we don't do ❌</h3>
          <ul>
            <li>Implement pre-determined solutions to problems or provide technical support on externally procured software.</li>
            <li>Maintain your data or collect new data on your behalf long term.</li>
            <li>Work against multiple stakeholders all at once without a set out Governance/decision making structure.</li>
            <li>Undertake desktop research on your behalf, have subject specific insight, nor quality assure subject specific data/analysis.</li>
            <li>Provide budget for products nor do we build business cases for you.</li>
            <li>Undertake open-ended projects and/or projects where there is no delivery plan possible to put in place.</li>
          </ul>
        </div>
        <div>
          <h3>What we do ✅</h3>
          <ul>
            <li>Work with you to understand your problem and requirements and use these to provide solution options.</li>
            <li>Help you to develop new functionality and data flows and processes. We will then provide you with the right knowledge on how to maintain this once the product has been handed over.</li>
            <li>Provide support for development of: databases, data flows/management, analytical products, and visualisations.</li>
            <li>Work to pre-agreed timelines.</li>
            <li>Provide our staff's time to complete projects for you.</li>
            <li>Provide our services free of charge for UKGI projects.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;