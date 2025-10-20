'use client';

import { ReactNode } from "react";

interface ShimmerTextProps {
  children: ReactNode;
  isActive: boolean;
}

const ShimmerText = ({ children, isActive }: ShimmerTextProps) => {
  return (
    <div className="relative overflow-hidden">
      {isActive && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-preventify-light-gray to-transparent animate-shimmer" />
      )}
      <span className="relative">{children}</span>
    </div>
  );
};

export default ShimmerText;