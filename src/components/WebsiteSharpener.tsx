'use client'; // This is necessary because it uses browser-specific features like style props

import React from 'react';

/**
 * WebsiteSharpener applies a subtle visual filter over the entire page 
 * to create the illusion of increased sharpness/crispness.
 */
const WebsiteSharpener = () => {
  // OPTION 1: The "Performance Friendly" Crisp Look (Recommended)
  const crispStyle = {
    backdropFilter: 'contrast(105%) brightness(100%) saturate(100%)', 
    WebkitBackdropFilter: 'contrast(105%) brightness(102%) saturate(102%)', // Safari support
  };

  return (
    <>
      {/* The Global Overlay: Sits fixed over everything */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
        style={crispStyle} 
      />
    </>
  );
};

export default WebsiteSharpener;