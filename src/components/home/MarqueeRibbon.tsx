
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeRibbonProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const MarqueeRibbon = ({ children, speed = 40, className }: MarqueeRibbonProps) => {
  const marqueeContent = (
    <>
      <span className="mx-4">{children}</span>
      <span className="mx-4">{children}</span>
      <span className="mx-4">{children}</span>
      <span className="mx-4">{children}</span>
    </>
  );

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 w-[200vw] py-3 bg-preventify-blue text-white overflow-hidden transform -rotate-3 z-10 shadow-lg",
        className
      )}
    >
      <motion.div
        className="flex whitespace-nowrap font-semibold uppercase tracking-wider"
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
