
import HeroSection from "@/components/home/HeroSection";
import HeroSectionTwo from "@/components/home/HeroSectionTwo";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import PreventiveLifestyleSection from "@/components/home/PreventiveLifestyleSection";
import MarqueeText from "@/components/home/MarqueeText";
import FixedWatermark from "@/components/home/FixedWatermark";

export default function HomePage() {
  return (
    <>
      <FixedWatermark />
      <div style={{ backgroundColor: "#f8f5f0" }}>
        <HeroSection />
        <HeroSectionTwo />
      </div>
      <PreventiveLifestyleSection />
      <ServicesSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <LocationsSection />
      <CtaSection />
      <MarqueeText />
    </>
  );
}
