
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import LocationsSection from "@/components/home/LocationsSection";
import CtaSection from "@/components/home/CtaSection";

/**
 * WordPress Theme Structure Note:
 * This component structure can be converted to a WordPress theme by:
 * - Creating templates in the theme directory (e.g., home.php, page.php, etc.)
 * - Translating React components to PHP/HTML templates
 * - Each section can become a template part (e.g., template-parts/home/hero.php)
 * - Components can use WordPress hooks and functions to fetch data dynamically
 */

const HomePage = () => {
  return (
    <MainLayout>
      {/* 
        In WordPress, these would be template parts like:
        get_template_part('template-parts/home/hero');
        get_template_part('template-parts/home/services');
        etc.
      */}
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <LocationsSection />
      <CtaSection />
    </MainLayout>
  );
};

export default HomePage;
