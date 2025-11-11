'use client';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSectionTwoDesktop = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // === ANIMATIONS ===

  // Headline: Fade In + Slide Up
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.2], ["20px", "0px"]);

  // Sub-headline: Fade In after headline
  const subHeadlineOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const subHeadlineY = useTransform(scrollYProgress, [0.1, 0.3], ["20px", "0px"]);

  // Image: Blur → Clear + Scale Up
  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const imageBlur = useTransform(scrollYProgress, [0.2, 0.5], ["blur(10px)", "blur(0px)"]);

  // Section fade out at the end
  const sectionOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <div ref={targetRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.section
          style={{ opacity: sectionOpacity }}
          className="container mx-auto px-6"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT COLUMN: Text Content */}
            <div className="space-y-8">
              {/* Headline - Fade In + Slide Up */}
              <motion.h1
                style={{ opacity: headlineOpacity, y: headlineY }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Care That Follows Up, So You Stay on Track
              </motion.h1>

              {/* Sub-headline - Fade In after headline */}
              <motion.p
                style={{ opacity: subHeadlineOpacity, y: subHeadlineY }}
                className="mt-6 text-preventify-dark-gray"
              >
                AI-assisted evidence-based care across Kerala focused on prevention, early intervention, and better health outcomes for you and your family.
              </motion.p>
            </div>

            {/* RIGHT COLUMN: Image */}
            <motion.div
              style={{
                opacity: imageOpacity,
                scale: imageScale,
                filter: imageBlur,
              }}
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
        </motion.section>
      </div>
    </div>
  );
};

export default HeroSectionTwoDesktop;
