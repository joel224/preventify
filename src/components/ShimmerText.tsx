'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  text: string;
  className?: string;
}

const ShimmerText = ({ text, className }: ShimmerTextProps) => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of each line
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: "0.5em",
    },
    show: {
      opacity: 1,
      y: "0em",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Split the text by <br /> tags
  const lines = text.split(/<br\s*\/?>/g);

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="show"
      className={cn(className)}
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          variants={child}
          className="block" // Each line is a block element
        >
          {line}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default ShimmerText;
