'use client';
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

const ShimmerText = ({ children, className }: ShimmerTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const animation = {
    initial: {
      backgroundPosition: "200% 50%",
    },
    animate: {
      backgroundPosition: "-200% 50%",
    },
  };

  return (
    <motion.p
      ref={ref}
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-preventify-dark-gray via-preventify-dark-gray/60 to-preventify-dark-gray",
        className
      )}
      style={{
        backgroundSize: "200% 100%",
      }}
      variants={animation}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 2
      }}
    >
      {children}
    </motion.p>
  );
};

export default ShimmerText;
