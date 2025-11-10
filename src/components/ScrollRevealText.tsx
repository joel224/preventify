'use client';
import { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollRevealText = ({ children, className }: ScrollRevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const text = typeof children === 'string' ? children : '';
  const lines = text.split(/<br\s*\/?>/g);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("font-display", className)}
    >
      {lines.map((line, lineIndex) => (
        <motion.span 
          key={lineIndex} 
          className="block overflow-hidden"
          variants={lineVariants}
        >
          {line.split(" ").map((word, wordIndex) => (
            <motion.span 
              key={wordIndex}
              className="inline-block"
              variants={wordVariants}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ScrollRevealText;
