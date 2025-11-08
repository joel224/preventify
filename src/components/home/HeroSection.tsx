'use client';
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import BookingDialog from "../BookingDialog";
import ShimmerText from "../ShimmerText";
import { useRef } from "react";

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
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="pt-19">
                            <motion.div
                                initial="hidden"
                                animate="show"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: {},
                                    show: {
                                        transition: {
                                            staggerChildren: 0.15,
                                        },
                                    },
                                }}
                            >
                                <ShimmerText
                                    text="AI assisted Modern Healthcare<br />for a Preventive Lifestyle"
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                                />

                                <motion.p
                                    className="mt-6 text-preventify-dark-gray"
                                    variants={FADE_IN_ANIMATION_VARIANTS}
                                >
                                    AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                                </motion.p>
                                <motion.div
                                    className="mt-8 flex flex-col sm:flex-row items-center gap-6"
                                    variants={FADE_IN_ANIMATION_VARIANTS}
                                >
                                
                                </motion.div>
                            </motion.div>
                        </div>

                        <div className="relative h-[600px] hidden lg:block">
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
                </main>
            </motion.div>
        </section>
    )
}

export default HeroSection;
