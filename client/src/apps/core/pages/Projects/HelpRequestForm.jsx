import React, { useState } from 'react';
import api from '../../../../api/axiosConfig';

function HelpRequestForm() {
  const [question, setQuestion] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) {
      setError("Please fill out the 'What' field.");
      return;
    }
    
    setError(null);

    try {
      // 1. Send the data to our new endpoint
      await api.post('/projects/help-request/', {
        question: question,
        motivation: motivation
      });
      
      // 2. Show a success message
      setSubmitted(true);

    } catch (err) {
      console.error("Failed to submit help request:", err);
      setError("Failed to submit. Please try again later.");
    }
  };

  // 3. Show a "thank you" message after submission
  if (submitted) {
    return (
      <div className="help-form success">
        <h4>Thank You!</h4>
        <p>Your request has been logged. We'll use this feedback to improve the platform.</p>
      </div>
    );
  }

  return (
    <div className="help-form">
      <h3>What data is missing?</h3>
      <p>If these summaries don't answer your questions, tell us what you want and why.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">What information do you want?</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., 'A list of all projects that are over budget'"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="motivation">Why do you want this information? (Optional)</label>
          <textarea
            id="motivation"
            rows="3"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="e.g., 'To prepare for the quarterly budget review'"
          ></textarea>
        </div>
        
        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
        
        <button type="submit" className="btn-submit" style={{padding: '10px 15px', cursor: 'pointer'}}>
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default HelpRequestForm;