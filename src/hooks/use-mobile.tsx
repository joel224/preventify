
'use client'
import * as React from "react"

const MOBILE_BREAKPOINT = 1024; // Corresponds to lg: breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Set initial value
    checkIsMobile();
    
    // Add listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
