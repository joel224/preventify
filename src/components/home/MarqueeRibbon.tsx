'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeRibbonProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const MarqueeRibbon = ({ children, speed = 50, className }: MarqueeRibbonProps) => {
  const marqueeContent = (
    <>
      <span className="mx-8">{children}</span>
      <span className="mx-8">{children}</span>
      <span className="mx-8">{children}</span>
      <span className="mx-8">{children}</span>
    </>
  );

  return (
    <div
      className={cn(
        "absolute inset-0 w-[200vw] h-[200vh] -top-[50%] -left-1/2 flex items-center justify-center transform rotate-12 z-0 opacity-10",
        className
      )}
    >
      <motion.div
        className="flex whitespace-nowrap text-8xl font-bold uppercase tracking-wider text-preventify-blue"
        animate={{ x: ['0%', '-25%'] }}
        transition={{
          ease: 'linear',
          duration: speed,
          repeat: Infinity,
        }}
      >
        {marqueeContent}
      </motion.div>
    </div>
  );
};

export default MarqueeRibbon;
