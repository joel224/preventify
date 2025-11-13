// src/components/home/HeroSection.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import the new client component that handles the logic.
const HeroSectionContent = dynamic(() => import('./HeroSectionContent'));

// This is a clean Server Component. Its only job is to load the client component.
export default function HeroSection() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#f8f5f0]" />}>
      <HeroSectionContent />
    </Suspense>
  );
}
