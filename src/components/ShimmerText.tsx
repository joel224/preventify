'use client';

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
}

const ShimmerText = ({ children, className }: ShimmerTextProps) => {
  return (
    <div
      className={cn(
        "group relative",
        className,
      )}
    >
      <span
        className="absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
    </div>
  );
};

export default ShimmerText;
