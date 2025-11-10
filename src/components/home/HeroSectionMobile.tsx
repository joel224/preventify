'use client';
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const HeroSectionMobile = () => {
    const mobileImages = [
      '/mobile/care_mobile.png',
      '/mobile/fam_mobile.png',
      '/mobile/doc_mobile.png',
    ];

    return (
        <section className="relative w-full overflow-hidden lg:hidden">
             <Carousel
                className="w-full"
                plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {mobileImages.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="w-full h-[60vh] sm:h-[70vh] relative">
                          <Image
                            src={src}
                            alt={`Hero Image ${index + 1} (Mobile)`}
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                          />
                        </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
        </section>
    )
}

export default HeroSectionMobile;
