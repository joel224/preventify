'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const MarqueeText = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={targetRef} className="bg-background py-16 md:py-24 overflow-hidden">
      <motion.div style={{ x }} className="whitespace-nowrap">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-preventify-blue opacity-80 uppercase font-display">
          Preventify
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeText;
