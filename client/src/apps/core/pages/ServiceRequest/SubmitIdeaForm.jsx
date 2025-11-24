// client/src/pages/ServiceRequest/SubmitIdeaForm.js
import React, { useState } from 'react';
import api from '../../../../api/axiosConfig';

function SubmitIdeaForm() {
  // Initial state matches backend RequestCreate model
  const initialFormData = {
    request_type: 'New Idea',
    department: 'Internal',
    submitter_name: '',
    business_problem: '',
    desired_outcome: '',
    expected_benefits: '',
    preferred_date: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ loading: false, error: null, successId: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, successId: null });

    try {
      // Send data to backend using the pre-configured 'api' client
      const response = await api.post('/service-request/', formData);
      setStatus({ loading: false, error: null, successId: response.data.request_id });
      setFormData(initialFormData); // Clear form on success
    } catch (error) {
      console.error("Submission error:", error);
      let errorMsg = "Failed to submit request.";
      if (error.response?.data?.detail) {
         // Handle Pydantic validation errors nicely
         errorMsg = Array.isArray(error.response.data.detail) 
            ? error.response.data.detail.map(e => `${e.loc[1]}: ${e.msg}`).join(', ')
            : error.response.data.detail;
      }
      setStatus({ loading: false, error: errorMsg, successId: null });
    }
  };

  if (status.successId) {
     return (
         <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#e6f7e9', borderRadius: '8px' }}>
             <h3 style={{ color: '#1e662c', marginTop: 0 }}>Request Submitted Successfully!</h3>
             <p>Your reference ID is:</p>
             <div style={{fontSize: '1.5em', fontWeight: 'bold', margin: '1rem 0', color: '#333'}}>
                 {status.successId}
             </div>
             <button className="btn" onClick={() => setStatus({ ...status, successId: null })}>
                 Submit Another Request
             </button>
         </div>
     )
  }

  return (
    // --- WRAPPED IN A SIMPLE DIV (NO LAYOUT COMPONENT) ---
    <div>
      <h2>New Data & Analytics Request</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Department *</label>
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
            <option value="FInTAG">FInTAG</option>
          </select>
        </div>

        <div className="form-group">
          <label>Request Type *</label>
          <select name="request_type" value={formData.request_type} onChange={handleChange}>
            <option value="New Idea">New Idea</option>
            <option value="Demo">Demo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Submitter Email *</label>
          <input type="email" name="submitter_name" value={formData.submitter_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Business Problem * (min 5 chars)</label>
          <textarea name="business_problem" value={formData.business_problem} onChange={handleChange} required rows={3} />
        </div>

        <div className="form-group">
          <label>Desired Outcome * (min 5 chars)</label>
          <textarea name="desired_outcome" value={formData.desired_outcome} onChange={handleChange} required rows={3} />
        </div>

        <div className="form-group">
          <label>Expected Benefits</label>
          <textarea name="expected_benefits" value={formData.expected_benefits} onChange={handleChange} rows={2} />
        </div>

        <div className="form-group">
          <label>Preferred Date</label>
          <input type="date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} />
        </div>

        {status.error && <p style={{ color: 'red', marginBottom: '1rem' }}>{status.error}</p>}
        
        <button type="submit" className="btn" disabled={status.loading}>
          {status.loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}

export default SubmitIdeaForm;