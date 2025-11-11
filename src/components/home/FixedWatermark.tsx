'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

const FixedWatermark = () => {
  const { scrollY } = useScroll();

  // The watermark will be fully visible at the top (scrollY: 0)
  // and will fade out completely as the user scrolls down 2000 pixels.
  // You can adjust the `[0, 2000]` range to control how quickly it fades.
  const opacity = useTransform(scrollY, [0, 2000], [0.09, 0]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full h-auto pointer-events-none z-50"
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
