// client/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// This is our "database" on the frontend
const DUMMY_USERS = {
  "user@ukgi.org.uk": {
    email: "user@ukgi.org.uk",
    name: "Regular User",
    roles: ["viewer"]
  },
  "admin@ukgi.org.uk": {
    email: "admin@ukgi.org.uk",
    name: "Administrator",
    roles: ["admin", "viewer"]
  }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // 1. User state is initialized from localStorage
  const [currentUser, setCurrentUser] = useState(
    () => DUMMY_USERS[localStorage.getItem('currentUserEmail') || "user@ukgi.org.uk"]
  );

  // 2. Function to switch users
  const switchUser = (email) => {
    localStorage.setItem('currentUserEmail', email); // Save choice
    setCurrentUser(DUMMY_USERS[email]);
  };

  // 3. The value to provide to all children
  const value = {
    user: currentUser,
    isAuthenticated: true,
    switchUser,
    allUsers: DUMMY_USERS // So the switcher can list them
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom hook to easily use this context
export const useAuth = () => useContext(AuthContext);