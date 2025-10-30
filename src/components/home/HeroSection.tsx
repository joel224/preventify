
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
  const images = [
    '/care.png',
    `/Fam.png`,
    `/doc.png`,
    `/love.png`,
   
  ];

  return (
    <section className="relative w-full overflow-hidden hero-gradient">
      <Carousel 
        className="w-full"
        plugins={[Autoplay({ delay: 8000, stopOnInteraction: true })]}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[480px] md:h-[560px] relative">
                  <Image 
                    src={src} 
                    alt={`Hero Image ${index + 1}`} 
                    fill 
                    className="object-cover"
                    priority={index === 0}
                  />
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
