import React, { useState, useEffect } from 'react';
import api from '../../../../api/axiosConfig';
import './ContactList.css'; // We'll create this next

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        // We can re-use the 'combined' endpoint, we just want the 'contacts' array
        const response = await api.get('/projects/combined/');
        
        // Sort by the 'formatted_name' field
        const sortedContacts = response.data.contacts.sort((a, b) => 
          a.formatted_name.localeCompare(b.formatted_name)
        );
        
        setContacts(sortedContacts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
        setError("Failed to load contact list.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []); // Empty dependency array means this runs once on load

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="contact-list-container">
      <h2>Contact Directory</h2>
      <p>Full list of all contacts from FInTAG and Corporate Governance project trackers.</p>
      
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name (Last, First)</th>
            <th>Email</th>
            <th>Known Departments</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.email}>
              <td><strong>{contact.formatted_name}</strong></td>
              <td>{contact.email}</td>
              <td>{contact.departments.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;