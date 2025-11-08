
'use client';
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TempHeroPage = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);
    const position = useTransform(scrollYProgress, (pos) =>
        pos >= 1 ? "relative" : "sticky"
    );

    return (
        <motion.section
            style={{ opacity }}
            ref={targetRef}
            className="h-[150vh] bg-white"
        >
            <motion.div 
                style={{ scale, position }}
                className="top-0 flex h-screen flex-col justify-center"
            >
                <main className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="pt-19">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                AI assisted Modern Healthcare for a Preventive Lifestyle
                            </h1>
                            <p className="mt-6 text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla magna mauris. Nulla fermentum viverra sem eu rhoncus consequat varius nisi quis, posuere magna.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                                <Button size="lg">Get Started Now</Button>
                                <div className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer">
                                    <PlayCircle className="h-8 w-8"/>
                                    <span className="font-semibold">Watch Video</span>
                                </div>
                            </div>
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
        </motion.section>
    )
}

export default TempHeroPage;
