// app/page.tsx (UPDATED - SIMPLIFIED)
// Remove HeroSectionTwo import and usage.
// Extend the wrapper height to 400vh to match the combined animation duration.
// FixedWatermark stays.

import HeroSection from "@/components/home/HeroSection"; // Now the combined one
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import PreventiveLifestyleSection from "@/components/home/PreventiveLifestyleSection";
import FixedWatermark from "@/components/home/FixedWatermark";

export default function Home() {
  return (
    <>
      <div style={{ backgroundColor: "#f8f5f0" }} className="relative h-[400vh]"> {/* Extended for full choreo */}
        <HeroSection /> {/* Single component now handles both phases */}
        <FixedWatermark />
      </div>
      <PreventiveLifestyleSection />
      <ServicesSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <LocationsSection />
      <CtaSection />
    </>
  );
}