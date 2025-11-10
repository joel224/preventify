
'use client';

import { Suspense } from "react";
import HeroSectionDesktop from "./HeroSectionDesktop";
import HeroSectionMobile from "./HeroSectionMobile";
import { useIsMobile } from "@/hooks/use-mobile";


export default function HeroSection() {
    const isMobile = useIsMobile();

    // On the initial render, `isMobile` will be undefined.
    // Return null or a placeholder to ensure the server and client render the same thing initially.
    if (isMobile === undefined) {
        return null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />}
        </Suspense>
    );
}
