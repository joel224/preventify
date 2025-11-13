'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

const FixedWatermark = () => {
  const { scrollY } = useScroll();

  // The watermark will start at 9% opacity at the very top (scrollY: 0)
  // and will fade out completely to 0% opacity as the user scrolls down 1500 pixels.
  // This ensures it is only visible for the first few sections of the page.
  const opacity = useTransform(scrollY, [0, 1500], [0.09, 0]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full h-auto pointer-events-none z-[-1]"
      style={{
        opacity,
        fontSize: '200px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#000',
        textAlign: 'center',
        lineHeight: '1',
        WebkitTextStroke: '1px #fff',
        textShadow: '0 0 20px rgba(255,255,255,0.8)',
        userSelect: 'none',
      }}
    >
      Preventify
    </motion.div>
  );
};

export default FixedWatermark;
