'use client';
import { motion } from 'framer-motion';

const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 15,
        ease: "linear",
      },
    },
  },
};

const MarqueeText = () => {
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden bg-preventify-blue/5">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-preventify-blue/5 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-preventify-blue/5 to-transparent z-10"></div>
      <motion.div
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        <h2 className="text-6xl md:text-8xl font-bold text-preventify-blue/50 uppercase tracking-wider px-8">
          Preventify
        </h2>
        <h2 className="text-6xl md:text-8xl font-bold text-preventify-blue/50 uppercase tracking-wider px-8">
          Preventify
        </h2>
        <h2 className="text-6xl md:text-8xl font-bold text-preventify-blue/50 uppercase tracking-wider px-8">
          Preventify
        </h2>
        <h2 className="text-6xl md:text-8xl font-bold text-preventify-blue/50 uppercase tracking-wider px-8">
          Preventify
        </h2>
      </motion.div>
    </section>
  );
};

export default MarqueeText;
