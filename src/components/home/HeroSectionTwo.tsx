
'use client';

import { Suspense } from "react";
import HeroSectionTwoDesktop from "./HeroSectionTwoDesktop";
import HeroSectionMobile from "./HeroSectionMobile";
import { useIsMobile } from "@/hooks/use-mobile";


export default function HeroSectionTwo() {
    const isMobile = useIsMobile();

    // On the initial render, `isMobile` will be undefined.
    // Return null or a placeholder to ensure the server and client render the same thing initially.
    if (isMobile === undefined) {
        return null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {isMobile ? <HeroSectionMobile /> : <HeroSectionTwoDesktop />}
        </Suspense>
    );
}
