'use client';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


const HeroSectionDesktop = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const filter = useTransform(
      scrollYProgress,
      [0, 0.5],
      ["blur(0px)", "blur(8px)"]
    );

    return (
        <section
            ref={targetRef}
            className="h-screen bg-white relative"
        >
            <motion.div
                style={{ y, scale, filter }}
                className="top-0 sticky flex h-full flex-col justify-center"
            >
                <main className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="pt-19">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 lg:leading-snug">
                                Care That Follows Up, So You Stay on Track
                            </h1>
                            <p className="mt-6 text-preventify-dark-gray">
                                AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
                            </p>
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
                </main>
            </motion.div>
        </section>
    )
}

export default HeroSectionDesktop;
