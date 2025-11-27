'use client';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface TextShineProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TextShine = ({ children, className, style }: TextShineProps) => {
  const ref = useRef(null);
  // Trigger animation every time it comes into view
  const isInView = useInView(ref, { once: false, amount: 0.5 }); 

  const animation = {
    initial: {
      backgroundPosition: '200% 50%',
    },
    animate: {
      backgroundPosition: '-200% 50%',
    },
  };

  return (
    <motion.h2
      ref={ref}
      className={cn(
        'bg-clip-text text-transparent',
        'bg-gradient-to-r from-preventify-dark-gray via-white to-preventify-dark-gray',
        className
      )}
      style={{
        ...style,
        backgroundSize: '200% auto',
      }}
      variants={animation}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{
        duration: 1.6, // Slower, more elegant shine
        ease: 'linear',
        delay: 0.2, // Simple delay on trigger
      }}
    >
      {children}
    </motion.h2>
  );
};

export default TextShine;
