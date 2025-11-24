import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserSwitcher() {
  const { user, allUsers, switchUser } = useAuth();

  const handleSwitch = (e) => {
    switchUser(e.target.value);
    // Reload the page to apply new permissions
    window.location.reload(); 
  };

  return (
    <div style={{ margin: '0 1rem' }}>
      <label htmlFor="user-switcher" style={{ color: 'white', marginRight: '0.5rem', fontSize: '0.9em' }}>
        Current User:
      </label>
      <select 
        id="user-switcher" 
        value={user.email} 
        onChange={handleSwitch}
      >
        {Object.keys(allUsers).map(email => (
          <option key={email} value={email}>
            {allUsers[email].name} ({allUsers[email].roles.join(', ')})
          </option>
        ))}
      </select>
    </div>
  );
}
export default UserSwitcher;