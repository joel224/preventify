// src/components/home/HeroSectionTwoDesktop.tsx
'use client';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollRevealText from "../ScrollRevealText";

const HeroSectionTwoDesktop = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // === PAGE 2 ENTER ANIMATIONS ===

  // Fade in as Page 1 exits
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1]);

  // Slight delay for staggered reveal
  const textDelay = useTransform(scrollYProgress, [0.3, 0.5], [0.2, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ opacity }}
      className="h-screen sticky top-0 flex items-center"
    >
      <div className="container mx-auto px-6">
        <motion.div style={{ scale }} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN: Text Content */}
          <div className="space-y-8">
            <ScrollRevealText 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              wordDelay={0.08}
              lineDelay={0.1}
              style={{ delay: textDelay }}
            >
              Prevention powered by always-on intelligence
            </ScrollRevealText>
            <p className="mt-6 text-preventify-dark-gray">
              Kerala's AI-assisted, evidence-based care for early intervention and better health for your family.
            </p>
          </div>

          {/* RIGHT COLUMN: Image */}
          <div className="relative h-[600px] flex justify-center items-center">
            <div className="w-[600px] h-[600px] rounded-full overflow-hidden">
              <Image
                src="/RAW_IMG/Adobe Express - file (16).png"
                alt="Happy professional working on a laptop"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
                data-ai-hint="people working"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSectionTwoDesktop;