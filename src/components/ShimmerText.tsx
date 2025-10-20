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
        <span
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 20%, rgba(212, 206, 155, 0.1) 50%, transparent 80%)',
          }}
        />
      )}
      <span className="relative">{children}</span>
    </div>
  );
};

export default ShimmerText;
