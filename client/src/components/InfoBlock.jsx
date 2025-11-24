import React from 'react';

/**
 * A reusable component to display a styled title pill
 * next to a block of text content.
 *
 * @param {string} title - The text for the pill button (e.g., "ASPECT", "WHY?").
 * @param {React.ReactNode} children - The text content to display on the right.
 */
function InfoBlock({ title, children }) {
  return (
    <div className="info-block">
      <div className="info-block-title">
        {title}
      </div>
      <div className="info-block-content">
        {children}
      </div>
    </div>
  );
}

export default InfoBlock;