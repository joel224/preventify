
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
  const desktopImages = [
    '/care.png',
    '/Fam.png',
    '/edit_2.png',
    '/love.png',
  ];

  const mobileImages = [
    '/mobile/mobile.png',
    '/mobile/fam_mobile.png',
    '/mobile/doc_mobile.png',
  ];

  return (
    <section className="relative w-full overflow-hidden hero-gradient">
      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {desktopImages.map((src, index) => (
            <CarouselItem key={index}>
              {/* Mobile Image */}
              {mobileImages[index] && (
                <div className="w-full h-[480px] md:h-[560px] relative md:hidden">
                  <Image
                    src={mobileImages[index]}
                    alt={`Hero Image ${index + 1} (Mobile)`}
                    fill
                    className="object-cover object-left"
                    priority={index === 0}
                  />
                </div>
              )}
              {/* Desktop Image */}
              <div className="w-full h-[480px] md:h-[560px] relative hidden md:block">
                {index === 2 ? (
                   <img
                    src={src}
                    alt={`Hero Image ${index + 1} (Desktop)`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`Hero Image ${index + 1} (Desktop)`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
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
