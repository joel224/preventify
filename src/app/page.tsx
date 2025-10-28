
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";
import DoctorSearch from "@/components/home/DoctorSearch";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DoctorSearch />
      <ServicesSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <LocationsSection />
      <CtaSection />
    </>
  );
}
