import React, { useState } from 'react';

/**
 * A reusable accordion/dropdown component.
 *
 * @param {string} title - The text shown on the toggle button.
 * @param {boolean} startOpen - Whether the accordion is open by default.
 * @param {React.ReactNode} children - The content to show inside.
 */
function Accordion({ title, children, startOpen = false }) {
  // 1. State to track if the accordion is open or closed
  const [isOpen, setIsOpen] = useState(startOpen);

  // 2. Function to toggle the state
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-container" style={{ marginTop: '1rem' }}>
      {/* 3. The clickable toggle button */}
      <button
        className="accordion-toggle"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        {title}
      </button>

      {/* 4. The collapsible content area */}
      <div
        className="accordion-content"
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;