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
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(212, 249, 241, 0.69) 34%, rgba(163, 210, 187, 0.83) 50%, rgba(211, 206, 155, 0.76) 71%, rgba(233, 206, 172, 0.77) 79%, rgba(145, 99, 107, 0.47) 100%)',
          }}
        />
      )}
      <span className="relative">{children}</span>
    </div>
  );
};

export default ShimmerText;
