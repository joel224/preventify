'use client';

import { Suspense, lazy } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";

// Lazy load the actual display components, but with ssr: false since they use client-side hooks/logic
const HeroSectionDesktop = dynamic(() => import("./HeroSectionDesktop"), { ssr: false });
const HeroSectionMobile = dynamic(() => import("./HeroSectionMobile"), { ssr: false });

// This new component contains all the client-side logic.
export default function HeroSectionContent() {
    const isMobile = useIsMobile();

    // On the initial render, `isMobile` can be undefined.
    // Returning a fallback or null ensures no mismatch between server and client.
    if (isMobile === undefined) {
        return <div className="h-screen w-full bg-[#f8f5f0]" />; // Fallback placeholder
    }

    return (
        <Suspense fallback={<div className="h-screen w-full bg-[#f8f5f0]" />}>
            {isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />}
        </Suspense>
    );
}
