
import HeroSection from "@/components/home/HeroSection";
import HeroSectionTwo from "@/components/home/HeroSectionTwo";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import PreventiveLifestyleSection from "@/components/home/PreventiveLifestyleSection";

export default function HomePage() {
  return (
    <>
      <div className="relative z-10">
        <HeroSection />
      </div>
      <div className="relative z-0">
        <HeroSectionTwo />
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
