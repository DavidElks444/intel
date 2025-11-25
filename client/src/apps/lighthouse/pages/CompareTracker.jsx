import React, { useState } from 'react';

// Import the Old Version (from Core)
// Note the ../../../ path to get back to apps/core
//import CoreCombinedTracker from '../../core/pages/Projects/CombinedTracker';
//cometment
// Import the New Version (Local)
import ModernTracker from './ModernTracker';

function CompareTracker() {
  const [mode, setMode] = useState('modern'); // 'modern' or 'legacy'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#eef2f6' }}>
      
      {/* --- THE SWITCHER BAR --- */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 100,
        background: '#1a237e', color: 'white', 
        padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div style={{ fontWeight: 'bold' }}>UX / UI Laboratory</div>
        
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '4px' }}>
          <button 
            onClick={() => setMode('legacy')}
            style={{
              background: mode === 'legacy' ? 'white' : 'transparent',
              color: mode === 'legacy' ? '#1a237e' : 'rgba(255,255,255,0.7)',
              border: 'none', padding: '8px 20px', borderRadius: '16px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s'
            }}
          >
            Legacy (Core)
          </button>
          <button 
            onClick={() => setMode('modern')}
            style={{
              background: mode === 'modern' ? '#9A2A2A' : 'transparent', // Brand Red for active
              color: 'white',
              border: 'none', padding: '8px 20px', borderRadius: '16px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s'
            }}
          >
            Modern (Lighthouse)
          </button>
        </div>
      </div>

      {/* --- THE CANVAS --- */}
      <div style={{ padding: '0' }}>
        {mode === 'legacy' ? (
          <div style={{ padding: '2rem', background: 'white' }}>
             {/* Render the Original Component */}
             <div style={{ border: '2px dashed #ccc', padding: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, background: '#ccc', padding: '4px 8px', fontSize: '0.8rem', fontWeight: 'bold', color: '#555' }}>
                    ORIGINAL COMPONENT
                </div>
                <CoreCombinedTracker />
             </div>
          </div>
        ) : (
          /* Render the New Component */
          <ModernTracker />
        )}
      </div>

    </div>
  );
}

export default CompareTracker;