'use client';

// Import React namespace to access all features

import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Explicitly get useRef from React namespace
import React from 'react';
// ...
const { useRef } = React;
// ...
const inputRef = useRef(null);



interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  wordDelay?: number;
  lineDelay?: number;
}

const ScrollRevealText = ({ 
  children, 
  className,
  wordDelay = 0.08,
  lineDelay = 0.1
}: ScrollRevealTextProps) => {
  // Use the destructured useRef
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // ... rest of the component remains the same
  const text = typeof children === 'string' ? children : '';
  const lines = text.split(/<br\s*\/?>/g);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: lineDelay,
      },
    },
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: wordDelay,
      },
    },
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("font-display", className)}
    >
      {lines.map((line, lineIndex) => (
        <motion.span 
          key={lineIndex} 
          className="block overflow-hidden"
          variants={lineVariants}
        >
          {line.split(" ").map((word, wordIndex) => (
            <motion.span 
              key={wordIndex}
              className="inline-block"
              variants={wordVariants}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ScrollRevealText;