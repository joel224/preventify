// app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import HomePageContent from "@/components/home/HomePageContent";

// import FixedWatermark from "@/components/home/FixedWatermark";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* The relative and z-index style here is the minimal patch required. 
          It ensures the content below does not render on top of the 
          300vh hero animation space. */}
      <HomePageContent />
    </>
  );
}
