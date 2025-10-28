
'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden hero-gradient">
      <Carousel 
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
      >
        <CarouselContent>
          {/* Slide 1 */}
          <CarouselItem>
            <div className="w-full h-[480px] md:h-[560px] relative">
                <Image src="https://images.unsplash.com/photo-1542841791-1925b02a2bbb?q=80&w=1632&auto=format&fit=crop" alt="Transplant" fill className="object-cover" data-ai-hint="hands heart"/>
                 <div className="absolute inset-0 bg-black/40"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Life-Saving Transplants. <br/> Life-Changing Outcomes.
                        </h1>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Trusted expertise in kidney, liver, heart, and lung transplants.
                        </p>
                        <Button variant="secondary" size="lg">Learn More</Button>
                    </div>
                 </div>
            </div>
          </CarouselItem>

        </CarouselContent>
        <CarouselPrevious className="left-4 hidden sm:inline-flex" />
        <CarouselNext className="right-4 hidden sm:inline-flex" />
      </Carousel>
    </section>
  );
};

export default HeroSection;
