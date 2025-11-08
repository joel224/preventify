'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
}

const ShimmerText = ({ text, className, shimmerWidth = 100 }: ShimmerTextProps) => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: "0.25em",
    },
    show: {
      opacity: 1,
      y: "0em",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="show"
      className={cn("relative", className)}
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={child}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export default ShimmerText;
