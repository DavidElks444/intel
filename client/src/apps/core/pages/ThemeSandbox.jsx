import React, { useState } from 'react';

// 1. Define your theme palettes as a simple JS object.
// These styles *only* exist on this page.
const themes = {
  default: {
    headerBg: '#c00', // Your current bright red
    headerText: '#ffffff',
    pageBg: '#f5f5f5',
    textColor: '#333333',
    accent: '#c00',
  },
  dataFriendly: {
    headerBg: '#f0f0f0', // Light grey "FiveThirtyEight" style
    headerText: '#333333',
    pageBg: '#ffffff',
    textColor: '#333333',
    accent: '#0070c0', // A calm, accessible blue
  },
  dark: {
    headerBg: '#222222',
    headerText: '#e0e0e0',
    pageBg: '#121212',
    textColor: '#e0e0e0',
    accent: '#58a6ff', // A brighter blue for dark bg
  },
 
  gdsBlue: {
    headerBg: '#005ea5',   // GOV.UK Blue
    headerText: '#ffffff',
    pageBg: '#f8f8f8',     // GOV.UK Light Grey
    textColor: '#0b0c0c',  // GOV.UK Black
    accent: '#005ea5',
  },
  heritageGreen: {
    headerBg: '#00403c',   // Deep Heritage Green
    headerText: '#ffffff',
    pageBg: '#f5f5f5',
    textColor: '#333333',
    accent: '#00403c',
  },
  highContrast: {
    headerBg: '#000000',   // Pure Black
    headerText: '#ffffff',
    pageBg: '#ffffff',
    textColor: '#000000',
    accent: '#005ea5',     // Strong Blue
  }



};

// --- Button Styles (also defined locally) ---
const buttonBase = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 600,
  border: '2px solid #555',
  borderRadius: '6px',
  cursor: 'pointer',
  marginRight: '1rem'
};

const buttonStyles = {
  default: { ...buttonBase, backgroundColor: '#c00', color: '#fff', borderColor: '#c00' },
  dataFriendly: { ...buttonBase, backgroundColor: '#f0f0f0', color: '#333', borderColor: '#ccc' },
  dark: { ...buttonBase, backgroundColor: '#222', color: '#e0e0e0', borderColor: '#555' },
  gdsBlue: { ...buttonBase, backgroundColor: '#005ea5', color: '#fff', borderColor: '#005ea5' },
  heritageGreen: { ...buttonBase, backgroundColor: '#00403c', color: '#fff', borderColor: '#00403c' },
  highContrast: { ...buttonBase, backgroundColor: '#000', color: '#fff', borderColor: '#000' }
};


function ThemeSandbox() {
  // 2. Use local state to track the *name* of the current theme
  const [theme, setTheme] = useState('default');

  // 3. Get the active theme object based on the state
  const currentTheme = themes[theme];

  return (
    // 4. The entire page wrapper uses inline styles
    <div style={{ 
      padding: '2rem', 
      backgroundColor: currentTheme.pageBg, 
      color: currentTheme.textColor,
      minHeight: '100vh' // Make it fill the page
    }}>
      <h2>Theme Sandbox</h2>
      <p>
        Use these buttons to preview new color palettes.
        <br/>
        <strong>This page is designed to prompt discussion about colour given accessibility and bright red in context of data-driven visualisations.</strong>
      </p>

      {/* 5. Buttons use onClick to update the local 'theme' state */}
      {/* 5. Buttons use onClick to update the local 'theme' state */}
      <div style={{ margin: '1.5rem 0' }}>
        <button 
          style={buttonStyles.default}
          onClick={() => setTheme('default')}
        >
          Default (Red)
        </button>
        
        <button 
          style={buttonStyles.dataFriendly}
          onClick={() => setTheme('dataFriendly')}
        >
          Data Friendly
        </button>
        
        <button 
          style={buttonStyles.dark}
          onClick={() => setTheme('dark')}
        >
          Dark Mode
        </button>
        
        {/* --- ADD NEW BUTTONS --- */}
        <br />
        <button 
          style={buttonStyles.gdsBlue}
          onClick={() => setTheme('gdsBlue')}
        >
          GDS Blue
        </button>

        <button 
          style={buttonStyles.heritageGreen}
          onClick={() => setTheme('heritageGreen')}
        >
          Heritage Green
        </button>
        
        <button 
          style={buttonStyles.highContrast}
          onClick={() => setTheme('highContrast')}
        >
          High Contrast
        </button>
      </div>

      {/* 6. Preview elements also use inline styles from the 'currentTheme' object */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        border: `1px dashed ${currentTheme.textColor}`
      }}>
        <h3>Preview</h3>
        <p>This is standard text color.</p>
        <p>
          This is an <a href="#" style={{ color: currentTheme.accent }}>accent link</a>.
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: currentTheme.headerBg,
          color: currentTheme.headerText,
          fontWeight: 600
        }}>
          This is a header preview (like the main app banner).
        </div>
      </div>
    </div>
  );
}

export default ThemeSandbox;