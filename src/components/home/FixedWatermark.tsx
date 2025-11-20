'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FixedWatermark = () => {
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);

  // 1. Get the window height on mount to make the trigger point dynamic
  useEffect(() => {
    setViewportHeight(window.innerHeight);
    
    // Optional: Update on resize
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Define the scroll checkpoints for color
  // Stays black, then transitions to white
  const color = useTransform(
    scrollY,
    [0, viewportHeight * 0.7, viewportHeight * 0.9], 
    ['#000000', '#000000', '#FFFFFF'] 
  );

  // Define the scroll checkpoints for stroke color (to match or contrast)
  // Let's make the stroke black when the text is black, and fully white when the text is white
  const strokeColor = useTransform(
    scrollY,
    [0, viewportHeight * 0.7, viewportHeight * 0.9], 
    ['#000000', '#000000', '#FFFFFF'] // Stroke also turns white to enhance visibility
  );

  // 3. Adjusted Opacity
  const opacity = useTransform(
    scrollY, 
    [0, viewportHeight * 1.5], 
    [0.09, 0]
  );

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full h-auto pointer-events-none z-[-11]"
      style={{
        opacity,
        color, 
        scale: 1.05,
        fontSize: '200px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        lineHeight: '1',
        // --- CRITICAL CHANGE HERE ---
        // Changed stroke to be dynamic and fully opaque.
        // Also removed the `rgba` for a solid color.
        WebkitTextStroke: useTransform(strokeColor, (c) => `1px ${c}`), 
        // Text shadow can remain white for an glow effect regardless of text color
        textShadow: '0 0 20px rgba(255,255,255,0.8)', 
        userSelect: 'none',
      }}
    >
      Preventify
    </motion.div>
  );
};

export default FixedWatermark;