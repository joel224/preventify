// app/page.tsx

import HeroSection from "@/components/home/HeroSection";
// import HeroSectionTwo from "@/components/home/HeroSectionTwo";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import PreventiveLifestyleSection from "@/components/home/PreventiveLifestyleSection";

// import FixedWatermark from "@/components/home/FixedWatermark";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* The relative and z-index style here is the minimal patch required. 
          It ensures the content below does not render on top of the 
          300vh hero animation space. */}
      <div className="relative z-10 bg-background">
        <PreventiveLifestyleSection />
        <ServicesSection />
        <FeaturesSection />
        <BlogPreviewSection />
        <LocationsSection />
        <CtaSection />
      </div>
    </>
  );
}
