
'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const HeroSection = () => {
  // By adding a timestamp, we force the browser to reload the images
  // bypassing any caches. This is a common technique to handle updated assets.
  const cacheBuster = `?t=${new Date().getTime()}`;
  const images = [
    `/edit1.png${cacheBuster}`,
    `/edit.png${cacheBuster}`,
    `/edit2.png${cacheBuster}`
  ];

  return (
    <section className="relative w-full overflow-hidden hero-gradient">
      <Carousel 
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[480px] md:h-[560px] relative">
                  <Image src={src} alt={`Hero Image ${index + 1}`} fill className="object-cover"/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden sm:inline-flex" />
        <CarouselNext className="right-4 hidden sm:inline-flex" />
      </Carousel>
    </section>
  );
};

export default HeroSection;
