'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MarqueeText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="relative w-full py-12 md:py-16 overflow-hidden bg-preventify-blue/5">
      <motion.div
        className="flex whitespace-nowrap justify-center"
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h2 className="text-6xl md:text-8xl font-bold text-preventify-blue/50 uppercase tracking-wider px-8">
          Preventify
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeText;
