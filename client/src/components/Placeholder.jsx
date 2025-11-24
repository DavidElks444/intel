// client/src/components/Placeholder.js
import React from 'react';

/**
 * A reusable placeholder component for sections under construction.
 * It uses the .placeholder class from App.css
 * @param {string} title - The title for the placeholder box.
 * @param {number} height - (Optional) A specific height for the box.
 */
function Placeholder({ title = "Component", height }) {
  
  // Create a dynamic style object only for properties that change, like height
  const dynamicStyle = {
    height: height ? `${height}px` : undefined, // Apply height if one is given
  };

  return (
    <div className="placeholder" style={dynamicStyle}>
      <h4 className="placeholder-title">{title}</h4>
      <p className="placeholder-text">
        🚧 Under Construction
      </p>
    </div>
  );
}

export default Placeholder;