
'use client';
import { Button } from "@/components/ui/button";
import { Phone, Zap, Sun, Moon, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BookingDialog from "../BookingDialog";

const HeroSection = () => {
    return (
        <div className="bg-white min-h-screen overflow-hidden relative">
            <main className="container mx-auto px-6 lg:py-12 pb-16 pt-36">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            AI assisted Modern Healthcare for a Preventive Lifestyle
                        </h1>
                        <p className="mt-6 text-gray-600">
                            Evidence-based modern healthcare across Kerala, focused on prevention, early intervention, and better health outcomes for you and your family.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                            <BookingDialog>
                                <Button size="lg">Get Started Now</Button>
                            </BookingDialog>
                            <div className="flex items-center gap-2 text-gray-600 hover:text-primary cursor-pointer">
                                <PlayCircle className="h-8 w-8"/>
                                <span className="font-semibold">Watch Video</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[600px] hidden lg:block">
                    </div>
                </div>
            </main>

            {/* Background Shapes and Image - Absolutely Positioned */}
            <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
                <motion.div 
                    className="absolute bg-primary rounded-full w-[850px] h-[850px]"
                    animate={{ y: '-45%', x: '40%' }}
                >
                    <motion.div
                        className="relative rounded-full w-[840px] h-[840px] overflow-hidden" 
                        animate={{ y: '20%', x: '-10%' }}
                    >
                        <Image 
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1080&auto=format&fit=crop"
                            alt="Doctor with patient"
                            width={1000}
                            height={1000}
                            className="object-cover w-full h-full" 
                            data-ai-hint="doctor patient"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection;
