'use client';

import { Suspense } from "react";
import HeroSectionDesktop from "./HeroSectionDesktop";
import HeroSectionMobile from "./HeroSectionMobile";

// A simple hook to check for mobile screen size.
// For server components, this would be handled differently (e.g., with user-agent).
const useIsMobile = () => {
    if (typeof window === 'undefined') return false;
    // You can adjust the breakpoint as needed
    return window.innerWidth < 1024; 
};


export default function HeroSection() {
    // Since useIsMobile relies on `window`, it should be guarded
    // for SSR. We'll default to desktop and let the client-side swap.
    const isMobile = useIsMobile();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />}
        </Suspense>
    );
}
