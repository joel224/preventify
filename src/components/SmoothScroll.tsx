// src/components/SmoothScroll.tsx
'use client';
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height after render
  useEffect(() => {
    if (contentRef.current) {
      // Set a minimum height to ensure scrollability
      const minHeight = window.innerHeight * 2; // At least 2 screens tall
      setContentHeight(Math.max(contentRef.current.scrollHeight, minHeight));
    }
  }, []);

  // Get scroll position
  const { scrollY } = useScroll();

  // Create smooth scroll with spring physics
  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const smoothY = useSpring(scrollY, springConfig);

  // Apply negative transform to scroll content up as user scrolls down
  const y = useTransform(smoothY, (value) => -value);

  return (
    <>
      {/* Fixed container that moves smoothly */}
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full will-change-transform"
      >
        {children}
      </motion.div>

      {/* Dummy element to create scrollable height */}
      <div style={{ height: contentHeight }} />
    </>
  );
}