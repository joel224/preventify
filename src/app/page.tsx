// app/page.tsx
import HomePageContent from "@/components/home/HomePageContent";

export default function Home() {
  return (
    <>
      {/* The HeroSection is now rendered in layout.tsx for the homepage */}
      {/* The relative and z-index style here is the minimal patch required. 
          It ensures the content below does not render on top of the 
          300vh hero animation space. */}
      <HomePageContent />
    </>
  );
}
