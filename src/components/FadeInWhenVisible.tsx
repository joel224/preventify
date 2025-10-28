
'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInWhenVisible = ({ children, className }: FadeInWhenVisibleProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1,   // Trigger when 10% of the element is visible
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeInWhenVisible;
