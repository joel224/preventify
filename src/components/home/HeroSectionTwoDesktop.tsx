
'use client';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ShimmerText from "../ui/ShimmerText";
import ScrollRevealText from "../ScrollRevealText";

const HeroSectionTwoDesktop = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.8, 1], ["0%", "50%"]);

  return (
    <div ref={targetRef} className="h-[150vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale, y }}
          className="container mx-auto px-6 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-preventify-blue mb-6 leading-tight">
               <ScrollRevealText>
                  Technology Meets Empathy
               </ScrollRevealText>
            </h2>
            <ShimmerText className="text-lg md:text-xl text-preventify-dark-gray">
              We leverage cutting-edge AI and digital tools to enhance, not replace, the human touch in healthcare. Our platform ensures seamless communication, personalized follow-ups, and empowers you with data-driven insights into your health journey.
            </ShimmerText>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSectionTwoDesktop;
