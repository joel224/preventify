
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
import BookingDialog from "../BookingDialog"
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
            <div className="w-full relative">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-center md:text-left">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-preventify-dark-blue">
                        AI assisted Modern Healthcare for a <span className="text-primary">Preventive Lifestyle</span>
                    </h1>
                    <p className="text-lg text-preventify-dark-gray mb-8">
                        AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <BookingDialog>
                            <Button className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8">
                                Book an Appointment
                            </Button>
                        </BookingDialog>
                         <Link href="/programs">
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 text-lg py-6 px-8">
                                Our Services
                            </Button>
                        </Link>
                    </div>
                  </div>
                   <div className="hidden md:block">
                     <Image src="https://picsum.photos/seed/doc/600/400" alt="Doctor" width={600} height={400} className="rounded-lg" data-ai-hint="doctor healthcare"/>
                   </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          
          {/* Slide 2 */}
          <CarouselItem>
            <div className="w-full h-full relative">
                <Image src="https://images.unsplash.com/photo-1542841791-1925b02a2bbb?q=80&w=1632&auto=format&fit=crop" alt="Transplant" fill className="object-cover" data-ai-hint="hands heart"/>
                 <div className="absolute inset-0 bg-black/30"></div>
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
