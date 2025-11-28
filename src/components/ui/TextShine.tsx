'use client';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';

interface TextShineProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  delay?: number;
}

const TextShine = ({ 
  children, 
  className = '', 
  style = {}, 
  duration = 1.6, 
  delay = 0.2 
}: TextShineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (isInView && !hasPlayed) {
      setHasPlayed(true);
    }
  }, [isInView]);

  const animation = {
    initial: {
      backgroundPosition: '-100% 50%',
    },
    animate: {
      backgroundPosition: '200% 50%',
    },
  };

  return (
    <motion.h2
      ref={ref}
      className={cn(
        'relative inline-block font-bold',
        className
      )}
      style={{
        ...style,
        color: '#25338e',
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
        backgroundSize: '300% 100%',
        backgroundRepeat: 'no-repeat',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        // ✅ FIXED: Removed MozTextFillColor, using only standard properties
      }}
      variants={animation}
      initial="initial"
      animate={isInView && hasPlayed ? 'animate' : 'initial'}
      transition={{
        duration,
        ease: 'easeOut',
        delay,
        repeat: 26,
      }}
      onAnimationComplete={() => {
        if (isInView) {
          setHasPlayed(false);
        }
      }}
    >
      {children}
    </motion.h2>
  );
};

export default TextShine;