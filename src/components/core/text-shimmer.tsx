'use client';

import { motion } from 'framer-motion';

export function TextShimmer({ 
  children, 
  className = '', 
  duration = 2.6,
  style = {}
}: { 
  children: React.ReactNode; 
  className?: string; 
  duration?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      className={className}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: 'linear-gradient(90deg, #25338e, #4a6df7, #25338e)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </motion.span>
  );
}