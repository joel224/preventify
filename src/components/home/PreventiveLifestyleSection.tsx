'use client';

import { Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import PreventiveLifestyleSectionDesktop from "./PreventiveLifestyleSectionDesktop";
import PreventiveLifestyleSectionMobile from "./PreventiveLifestyleSectionMobile";

export default function PreventiveLifestyleSection() {
    const isMobile = useIsMobile();

    if (isMobile === undefined) {
        return null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {isMobile ? <PreventiveLifestyleSectionMobile /> : <PreventiveLifestyleSectionDesktop />}
        </Suspense>
    );
}
