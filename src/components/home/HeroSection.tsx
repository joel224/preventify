'use client';
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import BookingDialog from "../BookingDialog";
import ScrollRevealText from "../ScrollRevealText";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const HeroSection = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const FADE_IN_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring" } },
    };

    const mobileImages = [
      '/mobile/mobile.png',
      '/mobile/fam_mobile.png',
      '/mobile/doc_mobile.png',
    ];

    return (
        <section
            ref={targetRef}
            className="h-screen bg-white relative"
        >
            <motion.div
                style={{ scale, opacity }}
                className="top-0 sticky flex h-full flex-col justify-center"
            >
                <main className="container mx-auto px-6">
                    {/* Desktop View */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
                        <div className="pt-19">
                            <ScrollRevealText className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight lg:leading-snug">
                                Care That Follows Up, So You Stay on Track
                            </ScrollRevealText>

                            <motion.p
                                className="mt-6 text-preventify-dark-gray"
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                initial="hidden"
                                animate="show"
                                viewport={{ once: true }}
                            >
                                AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                            </motion.p>
                            <motion.div
                                className="mt-8 flex flex-col sm:flex-row items-center gap-6"
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                initial="hidden"
                                animate="show"
                                viewport={{ once: true }}
                            >
                            
                            </motion.div>
                        </div>
                        
                        <div className="relative h-[600px]">
                            <div className="absolute inset-0 flex justify-center items-center">
                                <motion.div
                                    className="absolute bg-[#4e6bff] rounded-full w-[760px] h-[760px] overflow-hidden"
                                    animate={{ y: '-15%', x: '10%' }}
                                >
                                    <motion.div
                                        className="w-96 h-96 overflow-hidden relative rounded-full w-[740px] h-[740px]"
                                        animate={{ y: '15%', x: '-7%' }}
                                    >
                                        <Image
                                            src="/RAW_IMG/Adobe Express - file (16).png"
                                            alt="Happy professional working on a laptop"
                                            width={1000}
                                            height={1000}
                                            className="object-cover w-full h-full"
                                            data-ai-hint="people working"
                                        />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Carousel View */}
                    <div className="lg:hidden relative w-full h-[480px] -ml-6">
                         <Carousel
                            className="w-full h-full"
                            plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
                            opts={{ loop: true }}
                          >
                            <CarouselContent>
                              {mobileImages.map((src, index) => (
                                <CarouselItem key={index}>
                                  <div className="w-full h-[480px] relative">
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
                    </div>

                </main>
            </motion.div>
        </section>
    )
}

export default HeroSection;