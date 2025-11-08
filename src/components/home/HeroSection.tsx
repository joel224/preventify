
'use client';
import { Button } from "@/components/ui/button";
import { Phone, Zap, Sun, Moon, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";



const TempHeroPage = () => {
    return (
        <div className="bg-white min-h-screen overflow-hidden">
            
            <main className="container mx-auto px-6 lg:py-12 pb-16 pt-[120px]">
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

                    {/* This div is now just a placeholder for the grid layout */}
                    <div className="relative h-[600px] hidden lg:block">
                        {/* Background Shapes and Image - Absolutely Positioned */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            
                            {/* CONTROLS FOR THE BLUE CIRCLE: */}
                            <motion.div 
                                className="absolute bg-[#4e6bff] rounded-full w-[760px] h-[760px] overflow-hidden"
                                animate={{ y: '-15%', x: '10%' }}
                            >
                                {/* The image is now a child of the blue circle */}
                                <motion.div
                                    className="w-96 h-96 overflow-hidden relative  rounded-full w-[740px] h-[740px]" 
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
        </div>
    )
}

export default TempHeroPage;
