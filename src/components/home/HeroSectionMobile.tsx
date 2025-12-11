'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const HeroSectionMobile = () => {
  const mobileImages = [
    '/mobile/care_mobile (1).webp',
    '/mobile/doc_mobile (1).webp',
    '/mobile/fam_mobile (1).webp',
  ];

  return (
    <section className="relative w-full overflow-hidden hero-gradient">
      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 10000, stopOnInteraction: true })]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {mobileImages.map((src, index) => (
            <CarouselItem key={index}>
              <div className="w-full aspect-[9/10] relative">
                <Image
                  src={src}
                  alt={`Hero Image ${index + 1} (Mobile)`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroSectionMobile;
