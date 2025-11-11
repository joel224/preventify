// src/components/home/HeroSectionTwoDesktop.tsx
'use client';
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HeroSectionTwoDesktop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // === ANIMATIONS ===

  // Headline: Fade In + Slide Up
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Sub-headline: Fade In after headline
  const subHeadlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: "easeOut" } }
  };

  // Image: Blur → Clear + Scale Up
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { delay: 0.6, duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div ref={ref} className="h-screen relative flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN: Text Content */}
          <div className="space-y-8">
            {/* Headline - Fade In + Slide Up */}
            <motion.h1
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={headlineVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Care That Follows Up, So You Stay on Track
            </motion.h1>

            {/* Sub-headline - Fade In after headline */}
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={subHeadlineVariants}
              className="mt-6 text-preventify-dark-gray"
            >
              AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
            </motion.p>
          </div>

          {/* RIGHT COLUMN: Image */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
            className="relative h-[600px] flex justify-center items-center"
          >
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
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSectionTwoDesktop;